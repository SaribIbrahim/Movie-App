# Movie Search Application

A modern React application that allows users to search and discover movies, track trending searches, and view detailed movie information. Built with React, Vite, and Appwrite backend.

![App Screenshot](public/hero-img.png)

## Features

- 🔍 Real-time movie search with debouncing
- 📈 Trending movies based on search popularity
- 🎬 Detailed movie information including ratings and release dates
- 🎨 Modern UI with responsive design
- 🚀 Fast performance with Vite
- 💾 Search history tracking with Appwrite

## Tech Stack

- React 19
- Vite 7
- Tailwind CSS 4
- Appwrite Backend
- TMDB API for movie data

## Getting Started

1. Clone the repository:
```bash
git clone <your-repo-url>
cd movie-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
```

4. Start the development server:
```bash
npm run dev
```

## Build

To create a production build:
```bash
npm run build
```

## Project Structure

- `/src` - Source code
  - `/components` - Reusable React components
  - `/assets` - Static assets
  - `appwrite.js` - Appwrite configuration and utilities
  - `App.jsx` - Main application component
  - `index.css` - Global styles and Tailwind configuration

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT