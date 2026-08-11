import { readdirSync, statSync, existsSync } from "node:fs";
import { unlink, rename } from "node:fs/promises";
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

  if (files.length === 0) continue;

  const plannedOuts = new Map();
  let hasCollision = false;

  // Preflight
  for (const file of files) {
    const outName = `${kebab(basename(file, extname(file)))}.webp`;
    const out = join(folder, outName);

    if (plannedOuts.has(outName)) {
      console.error(`Error: Collision detected. Source '${file}' and '${plannedOuts.get(outName)}' both map to '${outName}' in ${folder}.`);
      hasCollision = true;
    }
    plannedOuts.set(outName, file);

    if (existsSync(out)) {
       console.error(`Error: Unsafe pre-existing target '${outName}' detected in ${folder}.`);
       hasCollision = true;
    }
  }

  if (hasCollision) {
    console.error(`Aborting conversion for ${folder} due to preflight errors.`);
    process.exitCode = 1;
    continue; // skip this folder completely
  }

  // Conversion
  for (const file of files) {
    const src = join(folder, file);
    const outName = `${kebab(basename(file, extname(file)))}.webp`;
    const target = join(folder, outName);
    const tmp = join(folder, `.${outName}.tmp`);

    try {
      const meta = await sharp(src).metadata();
      const pipeline = sharp(src);
      if (meta.width && meta.width > MAX_W) pipeline.resize({ width: MAX_W });
      await pipeline.webp({ quality: QUALITY }).toFile(tmp);

      const tmpMeta = await sharp(tmp).metadata();
      if (!tmpMeta.width || !tmpMeta.height || tmpMeta.format !== 'webp') {
          throw new Error("Validation failed: Output is not a valid WebP image or has zero dimensions.");
      }

      await rename(tmp, target);
      await unlink(src);

      console.log(`${src}  ->  ${target}`);
    } catch (err) {
      console.error(`Failed to convert ${src}:`, err);
      process.exitCode = 1;
      if (existsSync(tmp)) {
          try { await unlink(tmp); } catch { /* ignore error during cleanup */ }
      }
    }
  }
}
console.log("done");
