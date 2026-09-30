# MovieExplorer 🎬

A modern, responsive movie discovery web application built with **React**, **Material UI (MUI)**, **React Router**, **Axios**, and the **TMDb API**.

Users can explore trending blockbusters, search millions of movies, filter by genre/year/rating, view detailed cast & official trailers, and manage a locally persisted watchlist.

---

## 🌟 Key Features

- **Trending Movies:** Live weekly trending movie feed powered by TMDb.
- **Instant & Debounced Search:** Search movies by title with built-in debouncing (450ms) and automatic query restoration from `localStorage`.
- **Advanced Filtering:** Filter by official TMDb Genres, Release Year, and Minimum Rating score.
- **Movie Details Page:** Deep dive into movie metadata, synopsis, release year, runtime, star ratings, cast list, and embedded YouTube trailers.
- **Local Watchlist / Favorites:** Add/remove movies from favorites with instant UI updates across all screens and persistence via `localStorage`.
- **Dark & Light Mode:** Sleek cinematic dark theme (default) and crisp light theme with theme persistence.
- **Demo Login Interface:** Accessible MUI login form with input validation, password visibility toggle, and security disclaimers.
- **Robust Error & Empty States:** Graceful fallbacks for network issues, missing posters/trailers, invalid IDs, and zero-match search results.

---

## 🛠️ Technology Stack

- **Frontend:** React 19, Create React App
- **UI Framework & Icons:** Material UI (MUI) v6/v9, Emotion, `@mui/icons-material`
- **Navigation:** React Router v7 (`BrowserRouter`, `Routes`, `Route`)
- **HTTP Client:** Axios (with custom request/response interceptors)
- **State Management:** React Context API (`ThemeContext`, `FavoritesContext`)
- **Storage:** Browser `localStorage`
- **Data Source:** TMDb (The Movie Database) API v3

---

## 🚀 Getting Started

### Prerequisites

- **Node.js:** v18.0.0 or higher (Tested on `v22.23.1`)
- **npm:** v9.0.0 or higher (Tested on `v11.2.0`)
- **TMDb API Key:** Free API key from [The Movie Database](https://www.themoviedb.org/settings/api).

### Installation

1. **Clone the repository / navigate to project folder:**
   ```bash
   cd movie-explorer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the `movie-explorer` root folder (refer to `.env.example`):
   ```env
   REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
   ```

4. **Start the Development Server:**
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

5. **Build for Production:**
   ```bash
   npm run build
   ```

---

## 📂 Project Architecture

```text
movie-explorer/
├── public/
│   ├── index.html          # HTML5 entry with SEO & Google Fonts
│   ├── robots.txt          # Search engine crawler directives
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── AppLayout.jsx   # Main layout shell with Navbar, Outlet, and Footer
│   │   ├── Navbar.jsx      # Header with navigation links & theme toggle
│   │   ├── Footer.jsx      # Footer with TMDb branding & attribution
│   │   ├── SearchBar.jsx   # Controlled search input with clear button
│   │   ├── MovieGrid.jsx   # Responsive grid container for movie cards
│   │   ├── MovieCard.jsx   # Movie card component with poster, rating & favorite button
│   │   ├── MovieCardSkeleton.jsx # Layout-stable skeleton placeholder
│   │   ├── MovieFilters.jsx# Genre, year, and rating filter controls
│   │   ├── ErrorState.jsx  # Error message view with Retry action
│   │   └── EmptyState.jsx  # No-results view with clear action
│   ├── pages/
│   │   ├── HomePage.jsx          # Main discovery, search & trending screen
│   │   ├── MovieDetailsPage.jsx  # Movie details, cast, & trailer view
│   │   ├── FavoritesPage.jsx     # Saved watchlist screen
│   │   ├── LoginPage.jsx         # Demo login interface
│   │   └── NotFoundPage.jsx      # Custom 404 page
│   ├── context/
│   │   ├── ThemeContext.jsx      # Theme mode state & localStorage sync
│   │   └── FavoritesContext.jsx  # Watchlist array & localStorage sync
│   ├── services/
│   │   ├── tmdbClient.js   # Axios instance with interceptors & error handler
│   │   └── movieService.js # Encapsulated TMDb API endpoints
│   ├── hooks/
│   │   ├── useDebounce.js  # Debounce hook for input value
│   │   └── useLocalStorage.js # Safe localStorage wrapper hook
│   ├── utils/
│   │   ├── formatDate.js   # Release date & runtime formatters
│   │   ├── formatRating.js # Vote score formatter & color categorization
│   │   └── imageUrl.js     # TMDb poster/backdrop URL builder with SVG fallbacks
│   ├── theme/
│   │   └── createAppTheme.js # Customized MUI theme definitions
│   ├── App.jsx             # Router configuration & Context wrappers
│   ├── index.js            # React root entry point
│   └── index.css           # Global CSS resets
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## ⚖️ TMDb Attribution Notice

This product uses the TMDb API but is not endorsed or certified by TMDb. All movie metadata and images are provided by [The Movie Database (TMDb)](https://www.themoviedb.org/).
