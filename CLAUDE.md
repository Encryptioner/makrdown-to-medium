# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A React-based web tool that converts Markdown to Medium-compatible HTML. Users paste markdown in the left panel and get Medium-formatted HTML in the right panel, ready to copy into Medium's editor. Built with Create React App, Redux for state management, and Material-UI for the interface.

Live at: http://markdown-to-medium.surge.sh/

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:3000)
npm start

# Build for production (outputs to build/ directory)
npm run build

# Run tests
npm test

# Eject from Create React App (one-way operation)
npm run eject
```

## Architecture & Code Organization

### Tech Stack
- **React 15.1.0** with Redux for state management
- **Material-UI 0.15.0** for UI components (legacy version)
- **marked 0.3.5** for Markdown parsing with custom renderer
- **Create React App 0.7.0** as build tooling (legacy version)

### State Management
Redux store with minimal state (`src/state.js:9-23`):
- `content`: Current markdown input text
- Action: `SET_CONTENT` updates content on textarea change

State flows: TextField component → dispatch(setContent) → Redux store → Medium component → converter → rendered HTML

### Core Components

**`src/app.js`** - Main application container
- Two-panel layout: HalfPage components for Markdown input and Medium output
- Connected to Redux for menu state (remnant from when options existed)

**`src/converter.js`** - Markdown to HTML conversion
- Uses marked library with custom renderer configuration
- Settings: GFM enabled, tables supported, sanitization on
- Takes Redux state content and returns HTML string

**`src/components/textfield/`** - Markdown input textarea
- Dispatches `setContent` action on every change
- Uses ref for direct DOM access to textarea value

**`src/components/medium/`** - HTML preview panel
- Renders converted HTML using `dangerouslySetInnerHTML`
- Connected to Redux state for content and codespan (legacy)
- Output is styled to match Medium's appearance

**`src/components/halfpage/`** - Reusable panel wrapper
- Provides header and optional subheader
- Background color customization

**`src/components/appbar/`** - Top navigation bar
- Material-UI AppBar component (options menu was removed)

### Entry Point
`src/index.js` wraps App with Redux Provider and Material-UI theme, requires tap event plugin for older Material-UI version.

## Development Notes

- Uses legacy React/Material-UI versions (pre-hooks era)
- Component structure follows Redux container/presentational pattern
- CSS modules are used per-component (`.css` files alongside `.js`)
- The codespan formatting option was removed but state remnants remain
- Built with Create React App so webpack config is abstracted unless ejected
