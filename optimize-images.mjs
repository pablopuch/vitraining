import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const imagesDir = path.resolve('public/images');
const outputDir = path.resolve('public/images'); // Overwrite in the same directory

async function optimizeImages() {
  try {
    const files = await fs.readdir(imagesDir);
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png)$/i.test(file));

    console.log(`Found ${imageFiles.length} images to optimize...`);

    for (const file of imageFiles) {
      const inputPath = path.join(imagesDir, file);
      const originalExt = path.extname(file);
      const baseName = path.basename(file, originalExt);
      const outputPath = path.join(outputDir, `${baseName}.webp`);

      console.log(`Processing ${file}...`);

      try {
        await sharp(inputPath)
          .resize({ width: 1280, withoutEnlargement: true }) // Resize large images
          .webp({ quality: 80 }) // Convert to WebP with good quality
          .toFile(outputPath);

        console.log(`  -> Saved as ${path.basename(outputPath)}`);

        // Cautiously remove original file only after successful conversion
        await fs.unlink(inputPath);
        console.log(`  -> Removed original: ${file}`);
      } catch (procError) {
        console.error(`  -> Failed to process ${file}:`, procError.message);
      }
    }

    console.log('Image optimization complete!');
  } catch (error) {
    console.error('Error during image optimization:', error);
  }
}

optimizeImages(); 