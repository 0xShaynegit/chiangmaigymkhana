const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const verifyImages = [
  'four-golfers-wide-course-background-588.webp',
  'four-golfers-wide-course-background-736.webp',
  'four-golfers-wide-course-background-448.webp',
  'six-golfers-group-photo-588.webp',
  'cricket-two-batsmen-green-gold-kit-588.webp',
  'cricket-two-batsmen-green-gold-kit-736.webp',
  'golf-driver-clubhead-ball-on-tee-588.webp',
  'club-sandwich-fries-food-plate-588.webp',
  'historical-1900s-colonial-veranda-photo-588.webp',
  'two-tennis-courts-blue-green-pavilion-600.webp',
  'club-logo-1898-88.webp',
  'club-logo-1898-176.webp',
  'club-logo-1898-100.webp'
];

async function verifyVariants() {
  console.log('Verifying image dimensions:\n');

  for (const filename of verifyImages) {
    const filepath = path.join(__dirname, 'images', filename);
    try {
      const metadata = await sharp(filepath).metadata();
      const stats = fs.statSync(filepath);
      console.log(`${filename}`);
      console.log(`  Dimensions: ${metadata.width}×${metadata.height}`);
      console.log(`  Size: ${(stats.size / 1024).toFixed(1)} KB`);
      console.log();
    } catch (err) {
      console.error(`ERROR: ${filename} - ${err.message}`);
    }
  }
}

verifyVariants().catch(console.error);
