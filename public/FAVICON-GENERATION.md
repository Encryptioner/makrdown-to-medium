# Favicon Generation Instructions

The project includes `favicon.svg` as the primary icon. To generate the PNG versions for better browser compatibility, you have two options:

## Option 1: Use Online Tools

Visit [favicon.io](https://favicon.io/favicon-converter/) or [realfavicongenerator.net](https://realfavicongenerator.net/) and upload the `favicon.svg` file to generate:

- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png` (180x180)
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`
- `og-image.png` (1200x630 for social media sharing)

## Option 2: Use ImageMagick CLI

If you have ImageMagick installed:

```bash
cd public

# Generate PNG favicons
magick favicon.svg -resize 16x16 favicon-16x16.png
magick favicon.svg -resize 32x32 favicon-32x32.png
magick favicon.svg -resize 180x180 apple-touch-icon.png
magick favicon.svg -resize 192x192 android-chrome-192x192.png
magick favicon.svg -resize 512x512 android-chrome-512x512.png

# Generate OG image (for social media)
magick favicon.svg -resize 1200x630 -background white -gravity center -extent 1200x630 og-image.png
```

## Option 3: Use Sharp (Node.js)

Create a script `generate-icons.js` in the root:

```javascript
const sharp = require('sharp');
const fs = require('fs');

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 }
];

async function generateIcons() {
  const svg = fs.readFileSync('public/favicon.svg');

  for (const { name, size } of sizes) {
    await sharp(svg)
      .resize(size, size)
      .png()
      .toFile(`public/${name}`);
    console.log(`Generated ${name}`);
  }

  // OG image
  await sharp(svg)
    .resize(1200, 630, { fit: 'contain', background: '#ffffff' })
    .png()
    .toFile('public/og-image.png');
  console.log('Generated og-image.png');
}

generateIcons();
```

Then run:
```bash
pnpm add -D sharp
node generate-icons.js
```

## Current Status

✅ `favicon.svg` - SVG favicon (works in modern browsers)
⚠️  PNG versions need to be generated using one of the methods above
⚠️  `og-image.png` needs to be generated for social media sharing

The app will work fine with just the SVG favicon, but generating PNGs ensures compatibility with older browsers and proper social media previews.
