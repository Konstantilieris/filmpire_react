# 🎬 Filmpire

A modern, feature-rich movie discovery application built with React that allows users to explore, search, and manage their favorite films using The Movie Database (TMDB) API.

## ✨ Features

### 🎭 Core Functionality

- **Movie Discovery**: Browse popular, top-rated, and upcoming movies
- **Genre-based Browsing**: Filter movies by 20+ different genres
- **Advanced Search**: Search for movies by title with real-time results
- **Movie Details**: Comprehensive movie information including cast, crew, ratings, and trailers
- **Actor Profiles**: Detailed actor information and filmography
- **Movie Recommendations**: AI-powered movie suggestions based on user preferences

### 🎨 User Experience

- **Dark/Light Mode**: Toggle between dark and light themes
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Material-UI Design**: Modern, clean interface using Material-UI components
- **Featured Movies**: Showcase trending and featured films
- **Pagination**: Smooth navigation through large movie collections

### 🔐 User Features

- **TMDB Authentication**: Secure login integration with The Movie Database
- **Personal Watchlist**: Save movies to watch later
- **Favorites Management**: Mark and manage favorite movies
- **User Profile**: Personalized user dashboard
- **Ratings**: Rate movies and view personal ratings

### 🎤 AI Integration

- **Alan AI Voice Assistant**: Voice-controlled navigation and movie search
- **Voice Commands**:
  - "Show me action movies"
  - "Search for The Matrix"
  - "Switch to dark mode"
  - "Go to my profile"

## 🛠️ Tech Stack

### Frontend

- **React** 18.2.0 - Core framework
- **React Router DOM** 6.16.0 - Client-side routing
- **Material-UI** 5.14.11 - Component library and theming
- **Material-UI Icons** - Comprehensive icon set

### State Management

- **Redux Toolkit** 1.9.6 - Modern Redux implementation
- **React-Redux** 8.1.2 - React bindings for Redux
- **RTK Query** - Data fetching and caching

### External APIs & Services

- **TMDB API** - Movie data and metadata
- **Alan AI SDK** 1.8.53 - Voice assistant integration
- **Axios** 1.5.0 - HTTP client for API requests

### Development Tools

- **Create React App** 5.0.1 - Build toolchain
- **ESLint** 8.50.0 - Code linting
- **Babel** - JavaScript transpilation

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Actors/         # Actor detail pages
│   ├── App.jsx         # Main application component
│   ├── FeaturedMovie/  # Featured movie showcase
│   ├── Movie/          # Individual movie cards
│   ├── MovieInformation/ # Detailed movie pages
│   ├── MovieList/      # Movie grid/list layouts
│   ├── Movies/         # Main movies page
│   ├── NavBar/         # Navigation component
│   ├── Pagination/     # Page navigation
│   ├── Profile/        # User profile management
│   ├── RatedCards/     # User-rated movies
│   ├── Search/         # Search functionality
│   └── Sidebar/        # Genre and category navigation
├── features/           # Redux slices
│   ├── auth.js         # Authentication state
│   └── currentGenreOrCategory.js # Active selection state
├── services/           # API integration
│   └── TMDB.js         # TMDB API endpoints
├── utils/              # Utility functions
│   ├── index.js        # Authentication helpers
│   └── ToggleColorMode.jsx # Theme switching
├── assets/             # Static assets
│   ├── genres/         # Genre icons
│   └── images/         # Application images
└── app/                # Redux store configuration
    └── store.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- TMDB API key
- Alan AI SDK key (optional, for voice features)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd filmpire
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   REACT_APP_TMDB_KEY=your_tmdb_api_key_here
   ```

4. **Get TMDB API Key**

   - Visit [The Movie Database](https://www.themoviedb.org/)
   - Create an account and request an API key
   - Add the key to your `.env` file

5. **Start the development server**
   ```bash
   npm start
   ```

The application will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## 🎯 Usage

### Basic Navigation

- **Home Page**: Browse popular movies
- **Sidebar**: Filter by genres or categories (Popular, Top Rated, Upcoming)
- **Search**: Use the search bar to find specific movies
- **Movie Cards**: Click any movie to view detailed information

### User Features

- **Authentication**: Click the login button to authenticate with TMDB
- **Favorites**: Heart icon to add/remove movies from favorites
- **Watchlist**: Bookmark icon to add movies to your watchlist
- **Ratings**: Rate movies using the star rating system

### Voice Commands (with Alan AI)

- "Show me comedy movies"
- "Search for Inception"
- "Switch to dark mode"
- "Go to my profile"
- "Show top rated movies"

## 🎨 Theming

The app supports both light and dark themes:

- Toggle using the theme switch in the navigation
- Theme preference is saved locally
- Material-UI theming system ensures consistency

## 📱 Responsive Design

- **Desktop**: Full sidebar navigation with grid layout
- **Tablet**: Collapsible navigation with responsive grid
- **Mobile**: Drawer navigation with optimized layout

## 🔧 Configuration

### TMDB API Configuration

The app uses TMDB API v3 endpoints:

- Movie discovery and search
- Genre listings
- Actor information
- User authentication
- Personal lists management

### Alan AI Configuration

Voice commands are configured in `src/components/Alan.jsx`:

- Genre selection
- Movie search
- Navigation commands
- Theme switching

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for the comprehensive movie API
- [Material-UI](https://mui.com/) for the beautiful component library
- [Alan AI](https://alan.app/) for voice assistant capabilities
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management

## 📞 Support

For support, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ using React and modern web technologies**
