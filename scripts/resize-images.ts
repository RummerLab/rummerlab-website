import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const GALLERY_DIR = './public/images/gallery';
//const GALLERY_DIR = './public/images/team';
const MAX_SIZE = 2000; // Reduced from 3000 to 2000px
const TARGET_DPI = 72; // Web-standard DPI
const QUALITY = 80; // Slightly reduced quality for better compression

async function resizeImage(filePath: string): Promise<void> {
  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    if (!metadata.width || !metadata.height) {
      console.log(`Skipping ${filePath} - Cannot read dimensions`);
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
      .withMetadata({ density: TARGET_DPI }) // Set DPI correctly
      .jpeg({
        quality: QUALITY,
        force: true, // Convert everything to JPEG
        chromaSubsampling: '4:2:0' // Standard chroma subsampling
      })
      .toFile(outputPath)
      .then(async (info) => {
        // Get file sizes for logging
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

async function processDirectory() {
  const files = await fs.promises.readdir(GALLERY_DIR);
  
  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|JPG|JPEG)$/)) {
      const filePath = path.join(GALLERY_DIR, file);
      await resizeImage(filePath);
    }
  }
}

processDirectory().then(() => {
  console.log('Image processing complete');
}).catch(error => {
  console.error('Error:', error);
}); 