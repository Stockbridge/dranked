# DRanked - Collaborative Tasting & Ranking

A mobile-first web application that allows groups of people (in-person or remote) to submit items for tasting and rank them against each other.

## Overview

DRanked enables collaborative tasting events where:

- **Host** creates an event with a unique join code
- **Guests** join using the event code and their name
- **Anyone** can add items to taste
- **Everyone** rates items on a 1-10 scale
- **Results** are compiled in real-time

Perfect for beer tastings, wine nights, whiskey flights, and more!

## Technology Stack

### Frontend

- **Next.js 16** with App Router
- **React 19** with TypeScript
- **Tailwind CSS 4** for styling
- **Mobile-first responsive design**

### Backend

- **PostgreSQL** database
- **Next.js API Routes** for server-side logic
- **pg** library for database connections

### Development Tools

- **TypeScript** for type safety
- **ESLint** for code quality
- **Vitest** for testing

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd dranked
```

2. Install dependencies:

```bash
npm install
```

3. Set up your database:

```bash
# Create a PostgreSQL database
createdb dranked

# Set your database URL
echo "DATABASE_URL=postgresql://username:password@localhost:5432/dranked" > .env.local
```

4. Initialize the database schema:

```bash
psql -d dranked -f lib/schema.sql
```

5. Start the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Features

### Event Management

- **Event Types**: Beer, Wine, Whiskey
- **Tasting Styles**:
  - **Open** - participants can see item details
  - **Blind** - item details are hidden during tasting
- **Flexible Duration**: Events can run for weeks (e.g., "Fresh Hop Season")
- **Item Limit**: Up to 250 items per event (typical: 10-50)

### User Experience

- **Simple Join Process**: Just event code + name
- **Mobile Optimized**: Large touch targets, one-handed operation
- **Collaborative**: Any participant can add items
- **Real-time Updates**: Live updates as users add items and ratings

### Security & Access

- **Host Control**: Secure admin access with cryptographic tokens
- **Guest Access**: Simple 6-character join codes
- **No Accounts**: Name-based identity within event scope

## Database Schema

### Core Tables

- **events** - Event metadata, join codes, host tokens
- **items** - Beverages/items being tasted
- **users** - Event participants
- **ratings** - User scores (1-10) for items

See `lib/schema.sql` for complete schema definition.

## Project Structure

```
/src/app/                    # Next.js App Router pages
  ├── page.tsx              # Home page - event creation
  ├── /api/                 # API routes
  └── /event/[id]/          # Event pages

/lib/                       # Business logic layer
  ├── db.ts                # Database connection
  ├── schema.sql           # Database schema
  ├── /db/                 # Database operations
  └── /api/                # API client functions

/types/                     # TypeScript definitions
```

## API Endpoints

### Events

- `POST /api/event/create` - Create new event
  - Body: `{ hostName, eventName, beverageType, tastingStyle }`
  - Returns: Event with join code, host token, and host user
- `GET /api/event/[id]` - Get event details
  - Returns: Basic event info (name, host, beverage type, join code)

### Items

- `GET /api/event/[id]/items` - List event items
- `POST /api/event/[id]/add-item` - Add new item
  - Body: `{ name, producer?, year?, type?, addedByUserId, addedByName }`
- `PUT /api/event/[id]/edit-item` - Update existing item
  - Body: `{ itemId, name, producer?, year?, type? }`

### Users

- `POST /api/users` - Join event as user
  - Body: `{ eventId, name }`
  - Returns: User record with ID

### Ratings

- `POST /api/ratings` - Submit/update rating
  - Body: `{ eventId, itemId, userId, score }`

## Pages & Routes

### Public Pages

- `/` - Home page
  - Create new event form
  - Recent events list (from localStorage)
- `/join/[code]` - Join event with 6-character code
  - Enter name to join
  - Creates user record
- `/event/[id]` - Event home page
  - View items list
  - Add new items
  - Edit items
  - No authentication required

### Item Management

- `/event/[id]/add` - Add item form
  - Requires user in localStorage
  - Redirects to join if no user
- `/event/[id]/edit?itemId=[id]` - Edit item form
  - Updates existing item details

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run lint` - Run ESLint

### Testing

Unit tests are written with Vitest and located alongside implementation files:

```bash
npm run test        # Run all tests
npm run test:ui     # Interactive test UI
```

### Environment Variables

Create `.env.local` with:

```
DATABASE_URL=postgresql://username:password@localhost:5432/dranked
```
