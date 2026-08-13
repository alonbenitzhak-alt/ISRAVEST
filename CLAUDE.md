# MANAIO Project Documentation

## Project Overview

**MANAIO** is a sophisticated real estate investment platform specifically designed for Israeli investors interested in properties abroad, primarily in Greece and Cyprus. The platform provides a comprehensive ecosystem for browsing, comparing, and investing in international properties with expert guidance.

## Technology Stack

### Core
- **Framework**: Next.js 16.1.6 (React 19.2.4)
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS 4.2.1 + PostCSS
- **Package Manager**: npm

### Backend & Services
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Email Service**: Resend (v6.9.3)
- **AI Integration**: Anthropic Claude SDK (v0.78.0)

### Frontend Libraries
- **Mapping**: Leaflet (v1.9.4)
- **Icons**: React Icons (v5.6.0)
- **HTML Sanitization**: Sanitize HTML (v2.17.1)

### Analytics & SEO
- Google Analytics integration
- OpenGraph/Twitter Card support
- Schema.org structured data for Organization type

## Project Structure

```
/src
├── /app                          # Next.js app directory
│   ├── /api                      # API routes
│   │   ├── /admin               # Admin endpoints (agents, leads, contact replies)
│   │   ├── /chat                # Chat/AI endpoints
│   │   ├── /auth                # Authentication endpoints
│   │   ├── /properties          # Property management endpoints
│   │   └── /webhooks            # Webhook handlers (Supabase, etc.)
│   ├── /agents                  # Agent marketplace page
│   ├── /admin                   # Admin dashboard
│   ├── /auth                    # Authentication pages (login, reset, etc.)
│   ├── /blog                    # Blog with dynamic routing [slug]
│   ├── /calculator              # Property ROI calculator
│   ├── /compare                 # Property comparison tool
│   ├── /contact                 # Contact form page
│   ├── /countries               # Country-specific pages
│   ├── /dashboard               # User dashboard
│   ├── /favorites               # Favorites management
│   ├── /how-it-works            # Educational page
│   ├── /partnership             # Partnership opportunities
│   ├── /privacy                 # Privacy policy
│   ├── /properties              # Property listing with filters
│   ├── /register                # Registration pages
│   ├── page.tsx                 # Home page
│   ├── layout.tsx               # Root layout with metadata
│   ├── globals.css              # Global styles
│   └── providers.tsx            # Context providers
├── /components                   # Reusable React components
│   ├── AIChatWidget.tsx         # AI chat interface
│   ├── ChatWindow.tsx           # Chat message display
│   ├── PropertyCard.tsx         # Property card component
│   ├── PropertyMap.tsx          # Map display component
│   ├── PropertyMapView.tsx      # Map view with properties
│   ├── LoginForm.tsx            # Login form
│   ├── LeadForm.tsx             # Lead capture form
│   ├── Navbar.tsx               # Navigation bar
│   ├── Footer.tsx               # Footer
│   ├── ShareButtons.tsx         # Social sharing
│   ├── PageHero.tsx             # Hero section component
│   ├── SplashScreen.tsx         # Loading/splash screen
│   └── CookieBanner.tsx         # Cookie consent banner
├── /lib                          # Utility functions and contexts
│   ├── LanguageContext.tsx      # i18n context (Hebrew/English)
│   ├── PropertiesContext.tsx    # Properties state management
│   ├── supabase.ts              # Supabase client
│   ├── anthropic.ts             # Claude SDK client
│   └── [other utilities]        # Helper functions
├── /data                         # Static data
│   └── countries.ts             # Country information
└── /public                       # Static assets
    ├── logo.svg
    ├── og-image.png
    └── [other assets]

/supabase                         # Supabase configuration
├── schema.sql                    # Database schema
└── [migration files]

/supabase-*.sql                   # Database migration scripts
├── schema.sql                    # Main schema
├── migration-add-hebrew.sql      # Hebrew support
├── migration-fix-status.sql      # Status fixes
├── migration-security-fixes.sql  # Security enhancements
└── migration-whatsapp.sql        # WhatsApp integration
```

## Key Features

### 1. Property Management
- Browse properties with advanced filtering (country, city, budget, property type, bedrooms)
- Property detail pages with images, descriptions, and pricing
- Property comparison tool
- Favorites/wishlist functionality
- ROI calculator for investment analysis

### 2. AI-Powered Chat
- Integrated Claude AI chat widget (AIChatWidget component)
- Chat window with message history
- Real-time responses powered by Anthropic SDK
- Context-aware property information

### 3. User Authentication
- Registration and login
- Email verification
- Password reset functionality
- Session management via Supabase

### 4. Lead Management
- Lead capture forms
- Contact forms with email notifications
- Admin dashboard for managing leads
- Pre-filled contact information

### 5. Admin Features
- Pending/approved agent management
- Lead management dashboard
- Contact reply interface
- Conversation management
- Agent approval workflow

### 6. Multi-language Support
- Hebrew (RTL) and English
- Language context for dynamic translation
- Localized content for different regions

### 7. Blog
- Dynamic blog posts with slug-based routing
- Content management
- SEO optimization

### 8. Maps & Visualization
- Leaflet-based property maps
- Interactive property location display
- Country-specific property views

### 9. SEO & Analytics
- Comprehensive metadata tags
- OpenGraph/Twitter Card support
- Schema.org structured data
- Google Analytics integration
- Dynamic sitemap

## Database Schema

The application uses Supabase/PostgreSQL with tables for:
- Users (authentication)
- Properties (listings with details, pricing, location)
- Leads (contact inquiries)
- Conversations (chat history)
- Favorites (user wishlist)
- Blog posts (content)
- Agents (marketplace)
- Admin settings

## Environment Configuration

Key environment variables (see `.env.example`):
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Service role for server-side operations
- `ANTHROPIC_API_KEY` - Claude API key
- `NEXT_PUBLIC_GA_ID` - Google Analytics ID
- `RESEND_API_KEY` - Email service key
- `NEXT_PUBLIC_SITE_URL` - Deployment URL

## Deployment

- **Version**: 1.0.0
- **Status**: Production ready
- **Deployment Date**: April 1, 2026
- **Default Site URL**: https://mymanaio.com

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm start        # Start production server
npm run lint     # Run ESLint
```

## Key Implementation Details

### Language & Localization
- Uses `useLanguage()` hook from LanguageContext
- `t()` function for translations
- `dir` property for RTL/LTR support

### Properties State
- Managed via `useProperties()` hook from PropertiesContext
- Provides `properties` array and manipulation functions

### API Routes Structure
- Server-side API routes for secure operations
- Supabase client with service role for admin operations
- Anthropic SDK integration for AI features

### Security Considerations
- HTML sanitization for user-generated content
- Supabase RLS (Row Level Security) for data protection
- Service role key only used on server-side
- Anonymous key for client-side Supabase queries

## Notable Features

1. **Property Numbering System**: 1948XXXX format for unique property IDs
2. **Multilingual Demo Properties**: 6 demo properties with full translations
3. **Enhanced Dashboard**: Contact pre-fill for better UX
4. **Mediterranean Imagery**: Redesigned splash screen with relevant imagery
5. **Comprehensive Translation**: Full support for Hebrew and English

## Getting Started for Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables from `.env.example`
4. Configure Supabase project
5. Set up Anthropic API credentials
6. Run development server: `npm run dev`
7. Access at http://localhost:3000

## Team & Contact

- Email: alon.benitzhak@gmail.com
- Repository: alonbenitzhak-alt/MANAIO
- Development Branch: claude/learn-project-t8f32m
