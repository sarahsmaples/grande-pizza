import { generate } from 'critical';
import { readdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '..', 'dist');

async function findHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await findHtmlFiles(full));
    } else if (entry.name.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

const htmlFiles = await findHtmlFiles(DIST);
console.log(`\nExtracting critical CSS for ${htmlFiles.length} page(s)...\n`);

for (const file of htmlFiles) {
  const rel = path.relative(DIST, file);
  process.stdout.write(`  ${rel} ... `);
  try {
    await generate({
      base: DIST + path.sep,
      src: rel,
      target: rel,
      inline: true,
      dimensions: [
        { width: 390,  height: 844  },  // mobile  (iPhone 14)
        { width: 1300, height: 900  },  // desktop
      ],
    });
    console.log('✓');
  } catch (err) {
    console.log('✗');
    console.error(`    ${err.message}\n`);
  }
}

console.log('\nDone.\n');
