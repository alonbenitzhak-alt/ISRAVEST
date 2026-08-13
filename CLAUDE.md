# Hapoel Digital Museum - מוזיאום הפועל הדיגיטלי

## Project Overview

**Hapoel Digital Museum** is a digital preservation project dedicated to documenting and celebrating the rich history of Hapoel Jerusalem (הפועל בירושלים), one of Israel's most storied football clubs. The museum serves as a comprehensive archive of the club's heritage through songs, historical matches, classic jerseys, and legendary squads.

## Mission

To create an accessible digital archive that preserves and celebrates Hapoel Jerusalem's centennial history, allowing fans worldwide to explore the club's musical heritage, iconic moments, and legendary players.

## Technology Stack

### Core
- **Framework**: Next.js 16.1.6 (React 19.2.4)
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS 4.2.1 + PostCSS
- **Package Manager**: npm

### Features
- Fully RTL (Right-to-Left) Hebrew support
- Responsive design for all devices
- Client-side data management (initially)
- Optional: Supabase integration for future database features

## Project Structure

```
/src
├── /app                          # Next.js app directory
│   ├── /songs                    # 🎵 Songs archive
│   │   └── page.tsx             # Songs listing with filtering
│   ├── /matches                  # ⚽ Matches archive
│   │   └── page.tsx             # Matches with season filtering
│   ├── /jerseys                  # 👕 Historic jerseys
│   │   └── page.tsx             # Jersey gallery by season
│   ├── /squads                   # 👥 Team squads
│   │   └── page.tsx             # Squad rosters by year/coach
│   ├── page.tsx                  # Homepage/hero section
│   ├── layout.tsx                # Root layout with navigation
│   └── globals.css               # Global Tailwind styles
├── /components                   # Reusable React components
└── /lib                          # Utility functions and contexts
/public                          # Static assets

Key Configuration Files:
├── next.config.ts               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── postcss.config.mjs           # PostCSS/Tailwind configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── package.json                 # Project dependencies
└── .env.example                 # Environment variables template
```

## Key Features

### 1. Songs Archive (🎵 /songs)
- Complete database of Hapoel songs across decades
- Filter by year/era
- Display song lyrics
- Links to YouTube and Spotify for listening
- Organized chronologically

### 2. Matches Archive (⚽ /matches)
- Historical match records with dates, opponents, scores
- Filter by season/year
- Statistics: wins, draws, losses, total goals
- Competition type (league, cup, European)
- Match notes and highlights
- Color-coded results (green=win, yellow=draw, red=loss)

### 3. Jerseys Gallery (👕 /jerseys)
- Historic jerseys organized by season
- Design descriptions and color palettes
- Manufacturer information
- Visual gallery with placeholder images
- Grouped by decade for easy browsing

### 4. Team Squads (👥 /squads)
- Complete squad rosters by season/year
- Players organized by position (goalkeeper, defense, midfield, forward)
- Coach/manager information
- Player numbers prominently displayed
- Squad statistics (player count by position)

### 5. Homepage
- Hero section with museum description
- Key statistics about the club
- Quick links to all archive sections
- About the museum section
- Responsive navigation

## Data Structure

All data is currently stored as hardcoded arrays in component files (demo data). Future versions will migrate to Supabase PostgreSQL database with tables for:
- `songs` - song metadata, lyrics, links
- `matches` - match records, results, competitions
- `jerseys` - jersey designs, colors, manufacturers
- `squads` - player rosters, positions, seasons
- `eras` - seasons/time periods for organization

## Design & Styling

- **Color Scheme**: Hapoel Red (#DC143C) as primary color with white and gray accents
- **Typography**: System fonts for optimal performance
- **Responsiveness**: Mobile-first design using Tailwind CSS grid/flexbox
- **Accessibility**: Semantic HTML, proper color contrast, RTL support
- **Language**: Full Hebrew (עברית) support with RTL layout

## Navigation Structure

```
Homepage (/)
├── Songs (/songs)
│   └── Individual song view with lyrics
├── Matches (/matches)
│   └── Season filtering and statistics
├── Jerseys (/jerseys)
│   └── Jersey detail view
└── Squads (/squads)
    └── Season selector and player listings
```

## Environment Configuration

No environment variables required for basic operation. Optional variables in `.env.example`:
- `NEXT_PUBLIC_SITE_URL` - Site deployment URL
- `NEXT_PUBLIC_GA_ID` - Google Analytics tracking ID
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` - For future database integration

## Development Commands

```bash
npm run dev      # Start development server on http://localhost:3000
npm run build    # Production build
npm start        # Start production server
npm run lint     # Run ESLint
```

## Component Architecture

### Page Components
- `page.tsx` files handle routing and page layout
- `"use client"` directive for client-side interactivity
- Local state management with `useState`
- Data filtering and sorting logic embedded

### Styling Approach
- Tailwind CSS utility classes exclusively
- No CSS modules or external stylesheets (except globals.css)
- Consistent spacing, colors, and sizing scales
- Responsive breakpoints: mobile-first

## Future Enhancements

- [ ] Supabase database integration for dynamic content management
- [ ] Admin panel for adding/editing songs, matches, jerseys, squads
- [ ] Image uploads for jersey gallery
- [ ] Video embeds for match highlights
- [ ] Advanced search and filtering
- [ ] User accounts for personalized favorites
- [ ] Timeline/chronological view of club history
- [ ] Statistics and analytics dashboard
- [ ] API endpoints for third-party integrations
- [ ] Mobile app version
- [ ] Multi-language support (English translations)

## Content Management

Currently, all content is hardcoded in component files as demo data:
- `src/app/songs/page.tsx` - Contains sample song data
- `src/app/matches/page.tsx` - Contains sample match data
- `src/app/jerseys/page.tsx` - Contains sample jersey data
- `src/app/squads/page.tsx` - Contains sample squad data

To add more content, update the respective arrays in these files.

## Deployment

- **Hosting**: Ready for deployment to Vercel, Netlify, or any Node.js hosting
- **Build Output**: Static Next.js build (no server-side functions required)
- **Performance**: Optimized with Next.js image optimization and code splitting
- **SEO**: Metadata configured in `layout.tsx`, ready for structured data

## Team & Contact

- **Creator**: Alon Benitzhak (alon.benitzhak@gmail.com)
- **Repository**: alonbenitzhak-alt/MANAIO
- **Development Branch**: claude/hapoel-fans-website-fxdswv

## Notes

- This is a fan-created project dedicated to preserving Hapoel Jerusalem's history
- All data included is demo/sample content for development
- Future versions will include production data from verified sources
- Project uses Hebrew as primary language with full RTL support
- Design inspired by classic museum aesthetics combined with modern web design

## Getting Started for Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Open http://localhost:3000 in your browser
5. Navigate through the archive sections (Songs, Matches, Jerseys, Squads)

## License

This is a community project celebrating Hapoel Jerusalem's legacy.
