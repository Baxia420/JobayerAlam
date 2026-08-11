import { readdirSync, statSync, unlinkSync, existsSync } from "node:fs";
import { join, extname, basename } from "node:path";
import sharp from "sharp";

const ROOT = "public/projects";
const MAX_W = 1600;
const QUALITY = 82;

const kebab = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const dirs = readdirSync(ROOT).filter((d) =>
  statSync(join(ROOT, d)).isDirectory()
);

for (const dir of dirs) {
  const folder = join(ROOT, dir);
  const files = readdirSync(folder).filter((f) =>
    /\.(png|jpe?g)$/i.test(f)
  );

  const generatedOuts = new Set();

  for (const file of files) {
    const src = join(folder, file);
    const outName = `${kebab(basename(file, extname(file)))}.webp`;
    const out = join(folder, outName);

    if (generatedOuts.has(outName)) {
      console.error(`Error: Collision detected. Two source files map to ${outName} in ${folder}. Skipping ${file}.`);
      continue;
    }

    if (existsSync(out) && !files.includes(outName.replace('.webp', '.png')) && !files.includes(outName.replace('.webp', '.jpg')) && !files.includes(outName.replace('.webp', '.jpeg'))) {
        // Wait, existsSync(out) could just be because it was already a .webp file?
        // But the script only processes png/jpg. If an unrelated .webp already exists, we shouldn't overwrite it.
        // Actually, if existsSync(out) and we haven't generated it this run, it's safer to skip.
        console.error(`Error: Output file ${outName} already exists in ${folder} and might be overwritten. Skipping ${file}.`);
        continue;
    }

    try {
      const meta = await sharp(src).metadata();
      const pipeline = sharp(src);
      if (meta.width && meta.width > MAX_W) pipeline.resize({ width: MAX_W });
      await pipeline.webp({ quality: QUALITY }).toFile(out);

      // Only delete original if successfully written
      unlinkSync(src);
      generatedOuts.add(outName);
      console.log(`${src}  ->  ${out}`);
    } catch (err) {
      console.error(`Failed to convert ${src}:`, err);
    }
  }
}
console.log("done");
