# E-Commerce Storefront

This is a single-page e-commerce web application built with React, TypeScript, Vite, and Tailwind CSS, using the E-comus API.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- Lucide React (icons)

## Setup and Run Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory with:
   ```env
   VITE_API_BASE_URL=https://e-commas-apis-production-e0f8.up.railway.app
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Key Decisions

- **State Management**: Used React Context API for both authentication and cart state for simplicity and since the app isn't overly complex
- **API Layer**: Centralized API calls using Axios with interceptors for automatic token handling and error responses
- **Styling**: Used Tailwind CSS for rapid and consistent styling
- **Routing**: Implemented public and protected routes with React Router

## Features

- User authentication (login/register/logout)
- Product listing with search, filtering by category, and sorting
- Product details page
- Shopping cart with add, remove, and quantity update functionality
- Responsive design for mobile, tablet, and desktop

## Known Limitations

- Checkout and order history features are not implemented (API endpoints may not be available or fully tested)
- Cart persistence is done locally in localStorage, not via API

