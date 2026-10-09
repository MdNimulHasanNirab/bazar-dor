
# Bazar Dor — বাজার দর

A Bangla market price website built with Next.js, Tailwind CSS, and Better Auth.

## Requirements

- Node.js 20 or later
- npm
- PostgreSQL database for Better Auth
- The Bazar Dor product API

## Installation

Install dependencies:

    npm install

Create `.env.local` and configure:

- NEXT_PUBLIC_API_BASE_URL
- BETTER_AUTH_SECRET
- BETTER_AUTH_URL
- DATABASE_URL

Generate a secure Better Auth secret and configure a PostgreSQL database.

Start the development server:

    npm run dev

Open http://localhost:3000.

## API endpoints

Categories:
GET /categories

Single category:
GET /categories/:id

All products:
GET /products

Filter products:
GET /products?category=chal

Single product:
GET /products/:id

Base API:
https://api.api-store.workers.dev/api/bazardor

## Images

Place these files in public/images:

- logo.png
- hero.png

## Authentication

Better Auth uses PostgreSQL to store users, sessions, and related
authentication records. Configure the database before using sign-up
and sign-in.

## Production

Set the environment variables in your hosting provider, use HTTPS,
and run:

    npm run build
    npm start