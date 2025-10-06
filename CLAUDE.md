# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.5.4 application using React 19.1.0, TypeScript, and Tailwind CSS v4. It follows the Next.js App Router architecture.

## Development Commands

```bash
# Development server (runs on localhost:8080 by default)
npm run dev

# Development server on port 3000
npm run dev:3000

# Production build
npm build

# Start production server
npm start

# Lint
npm run lint
```

## Project Structure

- **App Router**: Uses Next.js App Router with the `src/app/` directory
- **Path Aliases**: `@/*` maps to `./src/*` (configured in tsconfig.json)
- **Styling**: Tailwind CSS v4 with PostCSS
- **Fonts**: Uses Geist and Geist Mono fonts via `next/font/google`

## TypeScript Configuration

- Target: ES2017
- Strict mode enabled
- Module resolution: bundler
- Path aliases configured for `@/*` imports

## Architecture Notes

- **Layout**: Root layout in `src/app/layout.tsx` provides global HTML structure, metadata, and font configuration
- **Pages**: Page components live in `src/app/page.tsx` with automatic routing
- **Styling**: Global styles in `src/app/globals.css`, uses Tailwind's utility-first approach
- **Images**: Optimized via `next/image` component, static assets in `/public`

## Port Configuration

The default dev server runs on port 8080 instead of the standard 3000. Use `npm run dev:3000` if you need the standard port.

## Notes
- Always answer in Korean.
