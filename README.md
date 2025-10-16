# Markdown to Medium

A modern React-based web tool that converts Markdown to Medium-compatible HTML. Simply paste your markdown in the left panel and get beautifully formatted HTML in the right panel, ready to copy into Medium's editor with a single click.

## Features

- **Live Preview**: See your Medium-formatted content as you type
- **One-Click Copy**: Copy to clipboard button for easy pasting into Medium
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Medium-Style Typography**: Preview matches Medium's actual styling
- **Modern Stack**: Built with React 18, Material-UI v5, and Redux Toolkit
- **Auto-Deploy**: Automatic deployment to GitHub Pages via GitHub Actions

## Why This Tool?

While Medium has an import function, it often fails with formatting. This tool ensures your markdown is converted with proper Medium-compatible formatting every time.

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
