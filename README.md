# Super App

A modern React dashboard built with Vite, Tailwind CSS, and Zustand. This project combines widgets, routing, and external API integrations to provide a personalized dashboard experience.

## Features

- Dashboard layout with multiple widgets
- Weather, news, timer, notes, and user profile components
- Client-side routing with React Router DOM
- Global state management using Zustand
- API integration using Axios
- Tailwind CSS styling and Vite-powered development

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- Zustand
- React Router DOM
- Axios
- Lucide React icons
- js-cookie

## Project Structure

- `src/main.jsx` - entry point
- `src/App.jsx` - top-level application component
- `src/pages/` - route page components
- `src/components/` - dashboard widgets and UI components
- `src/store/useStore.js` - Zustand state management
- `public/` - static assets

## Setup

1. Install dependencies

```bash
npm install
```

2. Create a `.env` file in the project root with your API keys:

```env
VITE_NEWS_API_KEY=your_news_api_key
VITE_WEATHER_API_KEY=your_weather_api_key
VITE_OMDB_API_KEY=your_omdb_api_key
```

3. Start the development server

```bash
npm run dev
```

4. Open the app in your browser at the local Vite URL shown in the terminal.

## Available Scripts

- `npm run dev` - start the development server
- `npm run build` - build the app for production
- `npm run preview` - preview the production build
- `npm run lint` - run Oxlint static analysis

## Environment Variables

This app requires the following environment variables in `.env`:

- `VITE_NEWS_API_KEY` - News API key
- `VITE_WEATHER_API_KEY` - Weather API key
- `VITE_OMDB_API_KEY` - OMDB API key
