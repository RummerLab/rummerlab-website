import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const TEMP_DIR = './temp';
const OUTPUT_DIR = './public/images/blog/wheeler-et-al-2025-biology-open';
const MAX_SIZE = 2000;
const TARGET_DPI = 72;
const QUALITY = 80;

async function resizeImage(filePath: string, outputPath: string): Promise<void> {
  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    if (!metadata.width || !metadata.height) {
      console.log(`Skipping ${filePath} - Cannot read dimensions`);
      return;
    }

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
        
        console.log(`Processed ${path.basename(filePath)}:
          - Original: ${(originalSize / 1024 / 1024).toFixed(2)}MB
          - New: ${(newSize / 1024 / 1024).toFixed(2)}MB
          - Saved: ${savings}%
          - Dimensions: ${info.width}x${info.height}
          - Output: ${outputPath}
        `);
      });
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

async function processImages() {
  // Create output directory if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    await fs.promises.mkdir(OUTPUT_DIR, { recursive: true });
  }

  const files = await fs.promises.readdir(TEMP_DIR);
  
  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|JPG|JPEG|png|PNG)$/)) {
      const filePath = path.join(TEMP_DIR, file);
      // Create a clean filename (lowercase, replace spaces with hyphens)
      const cleanName = file
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9.-]/g, '')
        .replace(/\.(jpg|jpeg|png)$/i, '.jpg');
      
      const outputPath = path.join(OUTPUT_DIR, cleanName);
      await resizeImage(filePath, outputPath);
    }
  }
}

processImages().then(() => {
  console.log('Image processing complete');
  console.log(`Images saved to: ${OUTPUT_DIR}`);
}).catch(error => {
  console.error('Error:', error);
});

