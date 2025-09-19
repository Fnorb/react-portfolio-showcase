import { readdir, writeFile } from "node:fs/promises";
import { join, extname } from "node:path";
import sharp from "sharp";

const IMG_DIR = "public/images";
const OUT_JSON = "src/data/placeholders.json";
const exts = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

const files = (await readdir(IMG_DIR)).filter((f) =>
  exts.has(extname(f).toLowerCase())
);
const out = [];

for (const file of files) {
  const path = join(IMG_DIR, file);
  const img = sharp(path);
  const meta = await img.metadata();
  const { width = 0, height = 0 } = meta;

  const buf = await img.resize(20).webp({ quality: 40 }).toBuffer();

  const lqip = `data:image/webp;base64,${buf.toString("base64")}`;

  out.push({
    file: `/images/${file}`,
    width,
    height,
    lqip,
  });
}

await writeFile(OUT_JSON, JSON.stringify(out, null, 2), "utf8");
console.log(`✓ wrote ${OUT_JSON} for ${out.length} images`);
