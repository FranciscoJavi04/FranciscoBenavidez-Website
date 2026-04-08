const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { globSync } = require('fs');

const IMG_DIR = './photo-portfolio/assets/img';
const HTML_DIR = './photo-portfolio';
const QUALITY = 85;
const MAX_WIDTH = 1800;

// ── 1. Convert images ────────────────────────────────────────────────────────

function findImages(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findImages(full));
    } else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

async function convertImages() {
  const images = findImages(IMG_DIR);
  if (images.length === 0) {
    console.log('No images found to convert.');
    return [];
  }

  console.log(`Found ${images.length} image(s) to convert...\n`);
  const converted = [];

  for (const src of images) {
    const dest = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    if (fs.existsSync(dest)) {
      console.log(`  skip  ${src}  (webp already exists)`);
      converted.push({ src, dest });
      continue;
    }
    try {
      await sharp(src)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(dest);
      const srcKB = Math.round(fs.statSync(src).size / 1024);
      const destKB = Math.round(fs.statSync(dest).size / 1024);
      const pct = Math.round((1 - destKB / srcKB) * 100);
      console.log(`  ✓  ${path.basename(src)}  ${srcKB}KB → ${destKB}KB  (${pct}% smaller)`);
      converted.push({ src, dest });
    } catch (err) {
      console.error(`  ✗  ${src}: ${err.message}`);
    }
  }
  return converted;
}

// ── 2. Update HTML references ────────────────────────────────────────────────

function updateHtml() {
  const htmlFiles = fs.readdirSync(HTML_DIR)
    .filter(f => f.endsWith('.html'))
    .map(f => path.join(HTML_DIR, f));

  let totalReplacements = 0;

  for (const file of htmlFiles) {
    let content = fs.readFileSync(file, 'utf8');
    // Replace src/srcset references to jpg/jpeg/png inside assets/img with .webp
    const updated = content.replace(
      /(assets\/img\/[^"'\s]+)\.(jpg|jpeg|png)/gi,
      '$1.webp'
    );
    if (updated !== content) {
      fs.writeFileSync(file, updated, 'utf8');
      const count = (content.match(/(assets\/img\/[^"'\s]+)\.(jpg|jpeg|png)/gi) || []).length;
      totalReplacements += count;
      console.log(`  updated  ${path.basename(file)}  (${count} reference${count !== 1 ? 's' : ''})`);
    }
  }

  if (totalReplacements === 0) {
    console.log('  All HTML references already point to .webp.');
  }
}

// ── 3. Run ───────────────────────────────────────────────────────────────────

(async () => {
  console.log('=== Converting images to WebP ===\n');
  await convertImages();

  console.log('\n=== Updating HTML references ===\n');
  updateHtml();

  console.log('\nDone! Originals are kept alongside the new .webp files.');
  console.log('Add "photo-portfolio/assets/img/**/*.webp" to .gitignore if you want to keep originals only in git.');
})();
