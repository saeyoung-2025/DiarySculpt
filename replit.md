# Overview

This is a modern full-stack diary application built with React, TypeScript, Express, and PostgreSQL. The application allows users to create, view, search, and manage diary entries with emotional categorization, along with a separate memo system for quick notes. The app features a clean, responsive UI with Korean language support and uses shadcn/ui components for a polished user experience.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and caching
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Forms**: React Hook Form with Zod validation resolvers

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with structured error handling
- **Storage Layer**: Abstracted storage interface with in-memory implementation
- **Development**: Vite middleware for hot module replacement in development

## Data Storage
- **Database**: PostgreSQL with Neon serverless driver
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: Shared TypeScript schema definitions between client and server
- **Validation**: Zod schemas for runtime type validation
- **Migrations**: Drizzle Kit for database schema management

## Component Structure
- **Layout**: Single-page application with view state management
- **Components**: Modular React components for diary entries, memos, and UI elements
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Internationalization**: Korean language support with date-fns locale integration

## Development Tools
- **Build System**: Vite with React plugin and TypeScript support
- **Code Quality**: TypeScript strict mode with comprehensive type checking
- **Development Experience**: Hot reload, error overlays, and Replit integration
- **Path Aliases**: Configured aliases for clean import statements

# External Dependencies

## Core Framework Dependencies
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight routing library for React
- **react-hook-form**: Form handling with @hookform/resolvers for validation

## Database and Validation
- **drizzle-orm**: Type-safe ORM for PostgreSQL
- **drizzle-zod**: Integration between Drizzle and Zod for schema validation
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **zod**: Runtime type validation and schema definition

## UI and Styling
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Utility for creating component variants
- **clsx**: Conditional className utility
- **lucide-react**: Icon library

## Development and Build Tools
- **vite**: Fast build tool and development server
- **typescript**: Static type checking
- **esbuild**: Fast JavaScript bundler for production builds
- **@replit/vite-plugin-runtime-error-modal**: Development error handling
- **@replit/vite-plugin-cartographer**: Replit integration for development

## Utility Libraries
- **date-fns**: Date manipulation and formatting with Korean locale support
- **nanoid**: Unique ID generation
- **cmdk**: Command palette component
- **embla-carousel-react**: Carousel/slider functionality