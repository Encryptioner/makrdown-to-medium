#!/usr/bin/env node

/**
 * Icon Generation Script
 * Generates PNG favicons and OG image from favicon.svg
 *
 * Usage: node generate-icons.js
 * Requires: pnpm add -D sharp
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const svgPath = path.join(publicDir, 'favicon.svg');

const sizes = [
  { name: 'favicon-16x16.png', size: 16, description: 'Browser tab favicon' },
  { name: 'favicon-32x32.png', size: 32, description: 'Browser tab favicon' },
  { name: 'apple-touch-icon.png', size: 180, description: 'iOS home screen icon' },
  { name: 'android-chrome-192x192.png', size: 192, description: 'Android home screen' },
  { name: 'android-chrome-512x512.png', size: 512, description: 'Android splash screen' }
];

async function generateIcons() {
  console.log('🎨 Generating favicons from favicon.svg...\n');

  // Check if SVG exists
  if (!fs.existsSync(svgPath)) {
    console.error('❌ Error: favicon.svg not found in public/ directory');
    process.exit(1);
  }

  const svg = fs.readFileSync(svgPath);

  // Generate square icons
  for (const { name, size, description } of sizes) {
    try {
      await sharp(svg)
        .resize(size, size)
        .png()
        .toFile(path.join(publicDir, name));
      console.log(`✅ Generated ${name.padEnd(30)} (${size}x${size}) - ${description}`);
    } catch (error) {
      console.error(`❌ Failed to generate ${name}:`, error.message);
    }
  }

  // Generate OG image (1200x630 for social media)
  try {
    await sharp(svg)
      .resize(1200, 630, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .png()
      .toFile(path.join(publicDir, 'og-image.png'));
    console.log(`✅ Generated ${'og-image.png'.padEnd(30)} (1200x630) - Social media preview`);
  } catch (error) {
    console.error('❌ Failed to generate og-image.png:', error.message);
  }

  console.log('\n✨ Icon generation complete!\n');
  console.log('Generated files:');
  console.log('  • favicon-16x16.png');
  console.log('  • favicon-32x32.png');
  console.log('  • apple-touch-icon.png');
  console.log('  • android-chrome-192x192.png');
  console.log('  • android-chrome-512x512.png');
  console.log('  • og-image.png\n');
}

// Run if called directly
if (require.main === module) {
  generateIcons().catch(error => {
    console.error('\n❌ Error generating icons:', error.message);
    console.error('\nMake sure sharp is installed: pnpm add -D sharp\n');
    process.exit(1);
  });
}

module.exports = { generateIcons };
