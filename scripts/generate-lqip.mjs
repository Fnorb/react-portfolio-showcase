// scripts/generate-lqip.mjs
import { readdir, writeFile, mkdir } from "node:fs/promises";
import { join, extname, basename } from "node:path";
import sharp from "sharp";

const IMG_DIR = "public/images";
const THUMB_DIR = join(IMG_DIR, "thumb");
const OUT_JSON = "src/data/placeholders.json";
const exts = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

// Zielordner für Thumbnails sicherstellen
await mkdir(THUMB_DIR, { recursive: true });

// Nur Top-Level-Bilddateien in /public/images (keine Unterordner wie /thumb)
const files = (await readdir(IMG_DIR)).filter((f) =>
  exts.has(extname(f).toLowerCase())
);

const out = [];

for (const file of files) {
  const srcPath = join(IMG_DIR, file);
  const img = sharp(srcPath);
  const meta = await img.metadata();
  const { width = 1600, height = 0 } = meta;

  // LQIP: sehr klein, als Data-URI
  const lqipBuf = await img.resize(20).webp({ quality: 40 }).toBuffer();
  const lqip = `data:image/webp;base64,${lqipBuf.toString("base64")}`;

  // Medium/Thumb (~¼ Breite, mind. 400px)
  const targetW = Math.max(400, Math.round(width / 4));
  const base = basename(file, extname(file));
  const thumbName = `${base}.webp`;
  const thumbPath = join(THUMB_DIR, thumbName);

  await sharp(srcPath).resize(targetW).webp({ quality: 75 }).toFile(thumbPath);

  out.push({
    // Original (HQ)
    file: `/images/${file}`,
    full: `/images/${file}`,
    // Medium-Thumbnail
    thumb: `/images/thumb/${thumbName}`,
    // Meta
    width,
    height,
    // LQIP
    lqip,
  });
}

await writeFile(OUT_JSON, JSON.stringify(out, null, 2), "utf8");
console.log(
  `✓ wrote ${OUT_JSON} for ${out.length} images, thumbs in /images/thumb`
);
