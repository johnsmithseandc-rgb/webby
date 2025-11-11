# Quiz Pop! - Mobile Quiz Application

## Overview

Quiz Pop! is a mobile-first educational quiz application inspired by gamified learning platforms like Duolingo and Kahoot!. The app provides an engaging, playful interface for students to test their knowledge across multiple subjects including Filipino, Math, English, Araling Panlipunan, and CLE Values. Built with a modern React frontend and Express backend, the application emphasizes accessibility, fun design, and mobile-optimized user experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server, configured with custom alias resolution
- React Router via Wouter for lightweight client-side routing
- Mobile-first responsive design targeting viewport widths with specific breakpoints

**UI Component System**
- Shadcn UI component library (New York style variant) with Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Custom color system using CSS variables for theme consistency
- Rounded sans-serif typography (Nunito/Quicksand/Poppins) optimized for mobile readability
- Component spacing based on Tailwind units (4, 6, 8, 12) for visual consistency

**State Management & Data Fetching**
- TanStack Query (React Query) for server state management and caching
- Custom query client with automatic JSON parsing and error handling
- Credential-based authentication support built into fetch wrapper
- Stale-time set to Infinity for optimized caching strategy

**Design System Principles**
- Playful, gamified aesthetic with bold typography and vibrant gradients
- Primary/secondary/accent color scheme with border variants
- Elevation system using rgba overlays for hover/active states
- Minimum 44px touch targets for mobile accessibility
- Full viewport height splash screens with centered content
- Scrollable category selection with natural height flow

### Backend Architecture

**Server Framework**
- Express.js for HTTP server and API routing
- ESM module system for modern JavaScript syntax
- Custom middleware for request logging and JSON body parsing
- Raw body capture for webhook/signature verification scenarios

**Development Environment**
- Separate development and production configurations
- Vite middleware integration for HMR during development
- Static file serving in production mode
- Custom error overlay plugin for runtime debugging

**API Design Pattern**
- RESTful API structure with `/api` prefix for all application routes
- Centralized route registration system
- Request/response logging with automatic JSON capture
- Sub-80 character log truncation for readability

### Data Storage

**Database System**
- PostgreSQL as the primary relational database (via Neon serverless)
- Drizzle ORM for type-safe database operations and migrations
- Schema-first approach with TypeScript type inference
- Zod integration for runtime validation of database inputs

**Data Models**
- User authentication schema with username/password credentials
- UUID primary keys using PostgreSQL's `gen_random_uuid()`
- Unique constraints on username field
- Migration files organized in dedicated `/migrations` directory

**Storage Abstraction Layer**
- Interface-based storage design (IStorage) for flexibility
- In-memory storage implementation (MemStorage) for development/testing
- CRUD operations abstracted behind storage interface
- Easy swapping between storage implementations (memory vs. database)

### External Dependencies

**UI & Component Libraries**
- @radix-ui/* family (20+ component primitives) for accessible UI elements
- Tailwind CSS with PostCSS for styling compilation
- class-variance-authority and clsx for dynamic className management
- Lucide React for consistent icon system
- Embla Carousel for touch-friendly carousels

**Form Management**
- React Hook Form for performant form handling
- @hookform/resolvers for validation schema integration
- Zod for schema validation (via drizzle-zod)

**Development Tools**
- TypeScript for static type checking across client and server
- TSX for running TypeScript in Node.js
- ESBuild for production bundling with tree-shaking
- Drizzle Kit for database migrations and schema management

**Database & Connection**
- @neondatabase/serverless for PostgreSQL connection pooling
- connect-pg-simple for session storage (if sessions are implemented)

**Replit-Specific Integrations**
- @replit/vite-plugin-runtime-error-modal for error overlay
- @replit/vite-plugin-cartographer for code mapping
- @replit/vite-plugin-dev-banner for development environment indicators

**Utility Libraries**
- date-fns for date manipulation and formatting
- cmdk for command palette functionality
- nanoid for generating short unique identifiers