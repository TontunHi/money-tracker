# MoneyTracker - Personal Finance & Multi-Wallet Tracker

A high-quality, production-ready web application built with Next.js 14, Drizzle ORM, and NeonDB.

## Features

- **Multi-Wallet System**: Manage multiple wallets (Cash, Bank, Savings, Credit Card) with separate balances.
- **Flexible Transactions**: Support for Income, Expense, and Transfer between wallets.
- **Real-time Balance Updates**: Wallet balances are automatically adjusted based on transactions.
- **Modern UI/UX**: Minimalist Glassmorphism design with smooth transitions and animations.
- **Responsive Dashboard**: Overview of total balance, monthly summaries, and recent activity.
- **PWA Support**: Installable on mobile and works offline.
- **Back-dating**: Full control over transaction dates with a modern date picker.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Lucide React, Framer Motion
- **Database**: NeonDB (PostgreSQL) with Drizzle ORM
- **Validation**: Zod
- **PWA**: next-pwa

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd money-tracker
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add your NeonDB connection string:
   ```env
   DATABASE_URL=postgresql://your-user:your-password@your-host/neondb?sslmode=require
   ```

4. **Initialize Database**:
   Run the reset script to drop existing tables (if any) and push the new schema:
   ```bash
   npm run db:reset
   ```

5. **Run the development server**:
   ```bash
   npm run dev
   ```

## Key Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm run db:push`: Push local schema changes to the database.
- `npm run db:reset`: Clear all data and re-initialize the database schema.
- `npm run db:studio`: Open Drizzle Studio to explore your data visually.

## Folder Structure

- `/src/app`: Routing and page components.
- `/src/components/layout`: Shell and navigation.
- `/src/components/transactions`: Transaction forms and lists.
- `/src/components/ui`: Reusable shadcn/ui components.
- `/src/lib/actions`: Server Actions for business logic.
- `/src/lib/db`: Database schema and configuration.
- `/src/lib/validations`: Zod validation schemas.
- `/scripts`: Database maintenance scripts.
