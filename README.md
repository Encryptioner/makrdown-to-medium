# Markdown to Medium

A modern React-based web tool that converts Markdown to Medium-compatible HTML. Simply paste your markdown in the left panel and get beautifully formatted HTML in the right panel, ready to copy into Medium's editor with a single click.

## Features

- **Live Preview**: See your Medium-formatted content as you type
- **One-Click Copy**: Copy to clipboard button for easy pasting into Medium
- **Comprehensive Markdown Support**: All standard markdown elements work perfectly
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Medium-Style Typography**: Preview matches Medium's actual styling
- **Optimized HTML Output**: Custom renderer produces clean, Medium-compatible HTML
- **Modern Stack**: Built with React 18, Material-UI v5, and Redux Toolkit
- **Auto-Deploy**: Automatic deployment to GitHub Pages via GitHub Actions

## Supported Markdown Elements

This tool supports all standard markdown features with optimized rendering for Medium:

### Text Formatting
- **Headings** (H1-H6) with proper spacing
- **Bold** and *italic* text
- `Inline code` with proper styling
- ~~Strikethrough~~ text

### Lists
- Ordered lists (numbered) with correct numbering
- Unordered lists (bullet points)
- Nested lists (mixed ordered/unordered)
- Task lists with checkboxes

### Code Blocks
- Fenced code blocks with language syntax
- Proper indentation preservation
- HTML entity escaping for code safety

### Other Elements
- Links with optional titles
- Images with alt text
- Blockquotes with Medium-style formatting
- Horizontal rules
- Tables (with limited Medium support)
- Line breaks

## Why This Tool?

While Medium has an import function, it often fails with formatting, especially for:
- **Lists**: Incorrect numbering, lost nesting, phantom blank lines
- **Code blocks**: Lost indentation and spacing
- **Paragraphs**: Improper spacing between elements

This tool uses a custom renderer specifically optimized for Medium's HTML requirements, ensuring your markdown pastes correctly every time with proper formatting for all elements.

## How to Use

1. **Write or paste your markdown** in the left panel
2. **Preview the formatted result** in the right panel (styled like Medium)
3. **Click "Copy to Clipboard"** button
4. **Paste into Medium's editor** - all formatting will be preserved!

### Tips for Best Results

- Use standard markdown syntax for all elements
- For code blocks, specify the language for better highlighting (e.g., ```javascript)
- Keep nested lists simple (Medium has known issues with deeply nested structures)
- Test your content in the preview panel before copying

## Live Demo

**Hosted on GitHub Pages**: Will be available after enabling GitHub Pages in repository settings

## Development

### Prerequisites

- Node.js 18+
- pnpm 8+ (Install with: `npm install -g pnpm`)

### Local Development

```bash
# Install dependencies
pnpm install

# Start development server (runs on http://localhost:3000)
pnpm start

# Build for production
pnpm run build

# Run tests
pnpm test
```

## Deployment

### GitHub Pages (Recommended)

This project includes a GitHub Actions workflow for automatic deployment to GitHub Pages:

1. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Under "Build and deployment", select "GitHub Actions" as the source
2. **Push to master branch**:
   ```bash
   git push origin master
   ```
3. The GitHub Action will automatically:
   - Install dependencies
   - Build the project
   - Deploy to GitHub Pages

Your site will be available at: `https://<username>.github.io/<repository-name>/`

### Manual Deployment

You can also deploy the `build` directory to any static hosting service (Netlify, Vercel, Surge, etc.):

```bash
pnpm run build
# Deploy the 'build' directory to your hosting service
```

## Technology Stack

- **React 18.3** - Modern React with hooks
- **Redux Toolkit 2.x** - State management
- **Material-UI v5** - UI components and theming
- **Marked 12.x** - Markdown parsing
- **Create React App 5.x** - Build tooling

## Browser Support

Works on all modern browsers including:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC


---

## Support

If you find my work useful, consider supporting it:

[![SupportKori](https://img.shields.io/badge/SupportKori-☕-FFDD00?style=flat-square)](https://www.supportkori.com/mirmursalinankur)
