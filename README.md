# 🚀 Super App — Multi-Feature Personal Dashboard

A modern, feature-rich personal dashboard built with **React 19**, **Vite**, and **Tailwind CSS**. Super App combines real-time data, productivity tools, and entertainment into one beautifully designed single-page application.

---

## ✨ Features

### 🔐 User Registration & Authentication
- Custom registration form with full client-side validation (name, username, email, 10-digit mobile)
- Persistent login session stored securely in **browser cookies** via `js-cookie` and Zustand `persist` middleware
- No page reload returns the user to login — session is automatically restored on revisit
- Logout clears session from both the store and cookies

### 🎬 Category-Based Onboarding
- Onboarding screen lets users pick their favourite movie/content genres (Action, Drama, Romance, Thriller, Fantasy, Music, Comedy, Sports)
- Minimum of 4 categories must be selected to proceed
- Selected categories are persisted and used to personalise the Movies page

### 🌤️ Weather Widget
- Fetches **live weather data** from the [OpenWeatherMap API](https://openweathermap.org/api)
- Displays temperature, wind speed, pressure, humidity, and weather condition with dynamic icons
- Real-time clock showing current date and time in a styled pink banner
- Falls back to mock data gracefully when the API key is not configured

### 📰 News Widget
- Fetches **live top-headlines** from the [NewsAPI](https://newsapi.org/)
- Auto-rotates through articles every 5 seconds
- Displays article headline image, title, published date, and description
- Falls back to curated mock articles if the API is unavailable

### 📝 Notes Widget
- Quick memo pad with **Local Storage persistence** — notes survive page reloads and browser restarts
- Instant autosave on every keystroke
- One-click clear button (Trash icon) to wipe notes

### ⏱️ Timer Widget
- Countdown timer with Hours, Minutes, and Seconds controls
- Animated **SVG circular progress ring** in coral-red that depletes as time counts down
- Chevron buttons to set time; Start/Stop toggle to control the timer

### 🎥 Movies Browser
- Personalised movie rows based on selected categories
- Integrates with the [OMDb API](http://www.omdbapi.com/) for real movie data
- Detailed movie modal on click: shows poster, genre, runtime, plot, and cast
- Falls back to a curated list of classic films when the API key is inactive

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **Vite 8** | Blazing-fast dev server & bundler |
| **Tailwind CSS v4** | Utility-first styling |
| **Zustand v5** | Global state management |
| **zustand/middleware (persist)** | Cookie-based session persistence |
| **js-cookie** | Cookie read/write helper |
| **React Router DOM v7** | Client-side routing |
| **Lucide React** | Icon library |
| **Axios** | HTTP client |
| **OpenWeatherMap API** | Live weather data |
| **NewsAPI** | Live news headlines |
| **OMDb API** | Movie database |

---

## 📁 Project Structure

```
super-app/
├── public/
├── src/
│   ├── components/
│   │   ├── NewsWidget.jsx       # Live news feed with auto-rotation
│   │   ├── NotesWidget.jsx      # Local-storage memo pad
│   │   ├── TimerWidget.jsx      # Countdown timer with SVG ring
│   │   ├── UserProfileWidget.jsx # Profile card with logout
│   │   └── WeatherWidget.jsx    # Live weather with clock
│   ├── pages/
│   │   ├── Categories.jsx       # Genre selection onboarding
│   │   ├── Dashboard.jsx        # Main dashboard layout
│   │   ├── Movies.jsx           # Personalised movies browser
│   │   └── Register.jsx         # Registration & validation form
│   ├── store/
│   │   └── useStore.js          # Zustand store with cookie persistence
│   ├── App.jsx                  # Routes & protected route logic
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global styles
├── .env                         # API keys (not committed)
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js v18 or higher
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/bhanu6655/Secure-APP.git
cd Secure-APP

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root and add your API keys:

```env
VITE_NEWS_API_KEY=your_newsapi_key_here
VITE_WEATHER_API_KEY=your_openweathermap_key_here
VITE_OMDB_API_KEY=your_omdb_api_key_here
```

> **Note:** The app works without API keys — it falls back to realistic mock data automatically.

### Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔑 API Setup Guide

| API | Sign Up | Free Tier |
|---|---|---|
| [NewsAPI](https://newsapi.org/register) | Free registration | 100 req/day |
| [OpenWeatherMap](https://home.openweathermap.org/users/sign_up) | Free registration | 1,000 req/day |
| [OMDb API](http://www.omdbapi.com/apikey.aspx) | Free registration + email activation | 1,000 req/day |

> **OMDb Note:** After signing up, you **must click the activation link** sent to your email before the key will work.

---

## 📸 App Screenshots

### Registration Page
Dark themed registration form with a concert/DJ background image and real-time input validation.

### Category Selection
Vibrant grid of genre cards. Users must select at least 4 to proceed to the dashboard.

### Dashboard
A bento-grid layout featuring:
- **Top-left:** User profile card with avatar, name, username, categories, and logout button
- **Top-center:** Sticky yellow notes memo widget
- **Top-right:** Live news card with image and rotating articles
- **Bottom-left:** Animated weather card with date/time and live conditions
- **Bottom-right:** Countdown timer with circular progress animation

### Movies Page
Netflix-style horizontal scroll rows, one per chosen genre, with a full-screen modal for movie details.

---

## 🗺️ Routes

| Path | Component | Access |
|---|---|---|
| `/` | `Register.jsx` | Public |
| `/categories` | `Categories.jsx` | After registration |
| `/dashboard` | `Dashboard.jsx` | Protected (session required) |
| `/movies` | `Movies.jsx` | Protected (session required) |

---

## 🔒 Session Management

User sessions are stored in a browser cookie named `super-app-session` that expires after **7 days**. This means:
- Refreshing the page keeps the user logged in
- Closing and reopening the browser keeps the user logged in (for 7 days)
- Clicking "Logout" clears the cookie and returns the user to the registration screen

---

## 🧑‍💻 Author

**G. Bhanuprakash**
- B.Tech in Computer Science Engineering (Cyber Security specialisation)
- MLR Institute of Technology, Hyderabad
- Skills: React.js, Node.js, Express.js, Java, Python, SQL, REST APIs

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
