import { readdirSync, statSync, unlinkSync } from "node:fs";
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
  for (const file of files) {
    const src = join(folder, file);
    const out = join(folder, `${kebab(basename(file, extname(file)))}.webp`);
    const meta = await sharp(src).metadata();
    const pipeline = sharp(src);
    if (meta.width && meta.width > MAX_W) pipeline.resize({ width: MAX_W });
    await pipeline.webp({ quality: QUALITY }).toFile(out);
    unlinkSync(src);
    console.log(`${src}  ->  ${out}`);
  }
}
console.log("done");
