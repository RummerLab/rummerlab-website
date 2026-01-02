import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const MAX_SIZE = 2000;
const TARGET_DPI = 72;
const QUALITY = 80;

const IMAGE_PATHS = [
  './public/images/blog/debaere-et-al-2025-j-fish-biology/NA45_Hook_1_2018.jpg',
  './public/images/blog/debaere-et-al-2025-j-fish-biology/Cm1_injury4_20-11-2016_PAP.jpg',
  './public/images/blog/debaere-et-al-2025-j-fish-biology/Cm1_injury1_20-11-2016_PAP.jpg',
  './public/images/blog/debaere-et-al-2025-j-fish-biology/Cm_injury2_16-11-2016_MAH.jpg',
];

async function resizeImage(filePath: string): Promise<void> {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${filePath}`);
      return;
    }

    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    if (!metadata.width || !metadata.height) {
      console.log(`Skipping ${path.basename(filePath)} - Cannot read dimensions`);
      return;
    }

    const outputPath = path.join(
      path.dirname(filePath),
      `temp_${path.basename(filePath)}`
    );

    // Calculate new dimensions
    let width = metadata.width;
    let height = metadata.height;
    
    if (width > MAX_SIZE || height > MAX_SIZE) {
      const ratio = Math.min(MAX_SIZE / width, MAX_SIZE / height);
      width = Math.round(width * ratio);
      height = Math.round(height * ratio);
    }

    await image
      .resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .withMetadata({ density: TARGET_DPI })
      .jpeg({
        quality: QUALITY,
        force: true,
        chromaSubsampling: '4:2:0'
      })
      .toFile(outputPath)
      .then(async (info) => {
        const originalSize = (await fs.promises.stat(filePath)).size;
        const newSize = info.size;
        const savings = ((originalSize - newSize) / originalSize * 100).toFixed(2);
        
        // Delete original file
        await fs.promises.unlink(filePath);
        // Rename temp file to original name
        await fs.promises.rename(outputPath, filePath);
        
        console.log(`Processed ${path.basename(filePath)}:
          - Original: ${(originalSize / 1024 / 1024).toFixed(2)}MB
          - New: ${(newSize / 1024 / 1024).toFixed(2)}MB
          - Saved: ${savings}%
          - Dimensions: ${info.width}x${info.height}
        `);
      });
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

async function processImages() {
  for (const imagePath of IMAGE_PATHS) {
    await resizeImage(imagePath);
  }
}

processImages().then(() => {
  console.log('Image processing complete');
}).catch(error => {
  console.error('Error:', error);
});
