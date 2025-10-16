# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A modern React-based web tool that converts Markdown to Medium-compatible HTML. Users paste markdown in the left panel and get Medium-formatted HTML in the right panel with a one-click copy button for easy pasting into Medium's editor. Features responsive design for all devices and automatic deployment via GitHub Actions.

**Live**: Deployable to GitHub Pages (see README.md for setup instructions)

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server (runs on http://localhost:3000)
pnpm start

# Build for production (outputs to build/ directory)
pnpm run build

# Run tests
pnpm test
```

## Architecture & Code Organization

### Tech Stack
- **React 18.3** with modern hooks and functional components
- **Material-UI v5 (@mui/material)** for UI components and theming
- **Redux Toolkit 2.x** for state management with modern patterns
- **marked 12.x** for Markdown parsing
- **Create React App 5.x** as build tooling

### State Management
Redux Toolkit store with minimal state (`src/state.js`):
- `content`: Current markdown input text
- Uses `createSlice` for modern Redux patterns with `setContent` action

State flows: TextField component → dispatch(setContent) → Redux store → Medium component → converter → rendered HTML

### Core Components

**`src/app.js`** - Main application container
- Two-panel layout using HalfPage components for Markdown input and Medium output
- Fully responsive with CSS media queries for mobile/tablet support
- Clean functional component with no Redux connection

**`src/converter.js`** - Markdown to HTML conversion (ENHANCED)
- Custom renderer optimized for Medium's HTML requirements
- Addresses Medium's known issues: list numbering, spacing, code formatting
- Comprehensive support for all markdown elements:
  - Headings (H1-H6) with proper spacing
  - Clean list structure (ordered, unordered, nested, task lists)
  - Code blocks with HTML escaping and indentation preservation
  - Blockquotes, links, images, tables, emphasis, strikethrough
  - Paragraphs with proper spacing
- Post-processing for clean HTML output
- Error handling with user-friendly fallback messages
- Settings: GFM enabled, smart lists, XHTML output, no smartypants
- Custom renderer methods for each markdown element ensure Medium compatibility

**`src/components/textfield/`** - Markdown input textarea
- Uses `useDispatch` hook for Redux actions
- Controlled component with onChange handler
- Responsive styling with mobile optimizations

**`src/components/medium/`** - HTML preview panel with copy button
- **NEW**: Copy to clipboard button with visual feedback
- Uses `useSelector` hook for Redux state
- `useState` for copy button state management
- Snackbar notification on successful copy
- Renders converted HTML using `dangerouslySetInnerHTML`
- Medium-like typography and styling
- Responsive padding and font sizes

**`src/components/halfpage/`** - Reusable panel wrapper
- Provides header and optional subheader
- Background color customization
- Responsive: stacks vertically on mobile (< 768px)

**`src/components/appbar/`** - Top navigation bar
- Modern MUI AppBar with Toolbar
- Clean functional component

### Entry Point
`src/index.js` uses React 18's `createRoot` API, wraps App with Redux Provider and MUI ThemeProvider with custom green theme.

## Styling & Responsive Design

All components include responsive CSS with mobile-first approach:
- **Desktop**: Side-by-side panels (50% width each)
- **Mobile/Tablet (< 768px)**: Vertical stacking (100% width each)
- Typography scales appropriately for smaller screens
- Touch-friendly button sizes and padding

## Deployment

### GitHub Actions
Automated deployment workflow (`.github/workflows/deploy.yml`):
- Triggers on push to master branch
- Builds production bundle
- Deploys to GitHub Pages
- Requires GitHub Pages to be enabled with "GitHub Actions" source

## Development Notes

- Modern React 18 with hooks throughout
- No class components - all functional components
- Redux Toolkit for cleaner state management
- MUI v5 with sx prop for inline styling
- Responsive design with CSS media queries
- Built with Create React App so webpack config is abstracted unless ejected
- Copy to clipboard uses modern Clipboard API
