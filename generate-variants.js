const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imageConfigs = [
  {
    original: 'chiang-mai-gymkhana-chiangmaigymkhana-four-golfers-wide-course-background.webp',
    baseId: 'four-golfers-wide-course-background',
    variants: [
      { width: 588, height: 441 },
      { width: 736, height: 552 },
      { width: 448, height: 336 }
    ]
  },
  {
    original: 'chiang-mai-gymkhana-chiangmaigymkhana-six-golfers-group-photo.webp',
    baseId: 'six-golfers-group-photo',
    variants: [
      { width: 588, height: 441 },
      { width: 736, height: 552 },
      { width: 448, height: 336 }
    ]
  },
  {
    original: 'chiang-mai-gymkhana-chiangmaigymkhana-cricket-two-batsmen-green-gold-kit.webp',
    baseId: 'cricket-two-batsmen-green-gold-kit',
    variants: [
      { width: 588, height: 392 },
      { width: 736, height: 491 },
      { width: 448, height: 299 }
    ]
  },
  {
    original: 'chiang-mai-gymkhana-chiangmaigymkhana-golf-driver-clubhead-ball-on-tee.webp',
    baseId: 'golf-driver-clubhead-ball-on-tee',
    variants: [
      { width: 588, height: 392 },
      { width: 736, height: 491 },
      { width: 448, height: 299 }
    ]
  },
  {
    original: 'chiang-mai-gymkhana-chiangmaigymkhana-club-sandwich-fries-food-plate.webp',
    baseId: 'club-sandwich-fries-food-plate',
    variants: [
      { width: 588, height: 588 },
      { width: 736, height: 736 },
      { width: 448, height: 448 }
    ]
  },
  {
    original: 'chiang-mai-gymkhana-chiangmaigymkhana-historical-1900s-colonial-veranda-photo.webp',
    baseId: 'historical-1900s-colonial-veranda-photo',
    variants: [
      { width: 588, height: 340 },
      { width: 736, height: 426 },
      { width: 448, height: 259 }
    ]
  },
  {
    original: 'chiang-mai-gymkhana-chiangmaigymkhana-two-tennis-courts-blue-green-pavilion.webp',
    baseId: 'two-tennis-courts-blue-green-pavilion',
    variants: [
      { width: 600, height: 328 }
    ]
  },
  {
    original: 'chiang-mai-gymkhana-chiangmaigymkhana-club-logo-1898.webp',
    baseId: 'club-logo-1898',
    variants: [
      { width: 88, height: 88 },
      { width: 176, height: 176 },
      { width: 100, height: 100 }
    ]
  }
];

async function generateVariants() {
  let successCount = 0;
  let errorCount = 0;

  for (const config of imageConfigs) {
    const originalPath = path.join(__dirname, 'images', config.original);

    if (!fs.existsSync(originalPath)) {
      console.error(`ERROR: Original image not found: ${originalPath}`);
      errorCount++;
      continue;
    }

    console.log(`\nProcessing: ${config.baseId}`);
    console.log(`Original: ${config.original}`);

    for (const variant of config.variants) {
      try {
        const outputFilename = `${config.baseId}-${variant.width}.webp`;
        const outputPath = path.join(__dirname, 'images', outputFilename);

        await sharp(originalPath)
          .resize(variant.width, variant.height, {
            fit: 'cover',
            position: 'center'
          })
          .webp({ quality: 82 })
          .toFile(outputPath);

        const stats = fs.statSync(outputPath);
        console.log(`  ✓ ${outputFilename} (${(stats.size / 1024).toFixed(1)} KB)`);
        successCount++;
      } catch (err) {
        console.error(`  ✗ Failed to create ${variant.width}px variant: ${err.message}`);
        errorCount++;
      }
    }
  }

  console.log(`\n${'='.repeat(50)}`);
  console.log(`Generation complete!`);
  console.log(`Successful: ${successCount}`);
  console.log(`Errors: ${errorCount}`);
}

generateVariants().catch(console.error);
