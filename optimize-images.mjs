import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, 'public/images');
const outputDir = path.join(imagesDir, 'optimized'); // Output to a new 'optimized' subdirectory

// Ensure output directory exists
async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

async function optimizeImages() {
  try {
    await ensureDir(outputDir);

    const files = await fs.readdir(imagesDir);
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file)); // Include webp for re-optimization if needed

    console.log(`Found ${imageFiles.length} images to optimize...`);

    const sizes = [1280, 640, 320]; // Desired output widths

    for (const file of imageFiles) {
      if (file.startsWith('optimized')) continue; // Skip already optimized images folder

      const inputPath = path.join(imagesDir, file);
      const originalExt = path.extname(file);
      const baseName = path.basename(file, originalExt);

      console.log(`Processing ${file}...`);

      for (const size of sizes) {
        const outputPath = path.join(outputDir, `${baseName}-${size}w.webp`);
        try {
          await sharp(inputPath)
            .resize({ width: size, withoutEnlargement: true }) // Resize to specific width
            .webp({ quality: 80 }) // Convert to WebP with good quality
            .toFile(outputPath);
          console.log(`  -> Saved as ${path.basename(outputPath)} (${size}w)`);
        } catch (procError) {
          console.error(`  -> Failed to process ${file} at ${size}w:`, procError.message);
        }
      }
    }

    console.log('Image optimization complete!');
  } catch (error) {
    console.error('Error during image optimization:', error);
  }
}

optimizeImages(); 