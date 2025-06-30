# Simple Weather Reporter 🌤️

A modern, responsive React weather application that provides comprehensive weather information for any location worldwide. Built with clean architecture principles and featuring a beautiful, intuitive user interface with advanced forecasting capabilities.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://simple-weather-reporter-n32wyv15z-sheshans-projects-420d47d2.vercel.app/)
[![React](https://img.shields.io/badge/React-19.1.0-blue)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![API](https://img.shields.io/badge/API-WeatherAPI.com-orange)](https://www.weatherapi.com/)

## 🌟 Live Demo

**[View Live Application](https://simple-weather-reporter-n32wyv15z-sheshans-projects-420d47d2.vercel.app/)**

## 📱 Screenshots

### Current Weather
![Weather Dashboard](/screenshots/current-weather.png)

### Forecast
![Location Search and Forecast](/screenshots/Forecast.png)

## ✨ Features

### 🌍 Global Weather Search
- **Location Search**: Search and select any city worldwide with autocomplete suggestions
- **Real-time Data**: Current weather conditions with automatic updates every 5 minutes
- **Default Location**: Starts with Colombo, Sri Lanka, easily customizable

### 📊 Comprehensive Weather Information
- **Current Weather**: Temperature, "feels like" temperature, humidity, wind speed, UV index, and visibility
- **7-Day Forecast**: Daily weather predictions with high/low temperatures and conditions
- **Hourly Forecast**: 24-hour detailed forecast chart with temperature trends
- **Weather Icons**: Dynamic weather icons that match current conditions

### 🎨 User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Loading States**: Elegant loading spinners with contextual messages
- **Error Handling**: Robust error handling with retry functionality and user-friendly error messages
- **Smooth Animations**: Polished UI with smooth transitions and modern design

### ⚡ Performance & Architecture
- **Clean Architecture**: Modular component structure with separation of concerns
- **Custom Hooks**: Reusable logic with custom React hooks
- **API Optimization**: Implements caching, retry logic with exponential backoff
- **State Management**: Efficient state management for optimal performance

## 🛠️ Technologies Used

### Frontend
- **React 19.1.0** - Modern React with hooks and functional components
- **CSS3** - Custom CSS with gradients, flexbox, and responsive design
- **React Icons 5.5.0** - Beautiful weather-related icons and UI elements

### External APIs
- **WeatherAPI.com** - Reliable weather data provider with global coverage
  - Current weather conditions
  - 7-day weather forecast
  - Location search and autocomplete

### Development & Deployment
- **Create React App 5.0.1** - Development environment and build tools
- **Vercel** - Deployment platform for seamless CI/CD

## 🏗️ Project Structure

The application follows clean architecture principles with clear separation of concerns:

```
simple-weather-reporter/
├── public/                 # Static assets
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── WeatherCard.jsx          # Main weather display component
│   │   ├── SearchBar.jsx            # Location search with autocomplete
│   │   ├── HourlyForecastChart.jsx  # 24-hour forecast visualization
│   │   ├── DailyForecastSummary.jsx # 7-day forecast component
│   │   ├── LoadingSpinner.jsx       # Loading state component
│   │   ├── ErrorDisplay.jsx         # Error handling component
│   │   └── index.js                 # Component exports
│   ├── hooks/              # Custom React hooks
│   │   ├── useWeatherData.js        # Weather data management hook
│   │   └── useLocationSearch.js     # Location search hook
│   ├── services/           # External service integrations
│   │   └── WeatherAPIService.js     # Weather API service class
│   ├── utils/              # Utility functions
│   │   ├── weatherUtils.js          # Weather data formatting utilities
│   │   ├── forecastUtils.js         # Forecast data processing
│   │   ├── iconUtils.jsx            # Weather icon management
│   │   └── helpers.js               # General helper functions
│   ├── constants/          # Application constants
│   │   └── constants.js             # API config and app settings
│   ├── App.jsx             # Main application component
│   ├── App.css             # Global styles
│   ├── index.js            # Application entry point
│   └── index.css           # Base styles
├── screenshots/            # Product screenshots for documentation
├── package.json            # Dependencies and scripts
├── README.md              # Project documentation
└── LICENSE                # MIT License
```

### Key Design Patterns & Features

- **Singleton Pattern**: WeatherAPIService implements singleton for efficient API management
- **Custom Hooks**: Encapsulates weather data logic and location search functionality
- **Component Composition**: Modular, reusable components for maintainable code
- **Error Boundaries**: Comprehensive error handling throughout the application
- **Responsive Design**: Mobile-first approach with flexible layouts
- **API Optimization**: Request debouncing, caching, and retry mechanisms
- **State Management**: Efficient React state management with custom hooks

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 14 or higher)
- **npm** or **yarn**
- **WeatherAPI.com API Key** (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sheshan1/simple-weather-reporter.git
   cd simple-weather-reporter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   WEATHER_API_KEY=your_weather_api_key_here
   ```

   > **Get your free API key**: Visit [WeatherAPI.com](https://www.weatherapi.com/), sign up for a free account, and copy your API key.

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:3000` to see the application running.

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder, ready for deployment.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🔧 Configuration & Customization

### API Configuration

The application uses WeatherAPI.com for weather data. You can customize the API configuration in `src/constants/constants.js`:

```javascript
export const API_CONFIG = {
  BASE_URL: 'https://api.weatherapi.com/v1',
  ENDPOINTS: {
    CURRENT: '/current.json',
    FORECAST: '/forecast.json',
    SEARCH: '/search.json'
  },
  DEFAULT_PARAMS: {
    aqi: 'no'  // Air quality index
  }
};
```

### Default Location

Currently set to Colombo, Sri Lanka. You can change this in `src/constants/constants.js`:

```javascript
export const DEFAULT_LOCATION = 'Colombo';
```

### Auto-refresh Interval

Weather data automatically refreshes every 5 minutes. Modify this in `src/constants/constants.js`:

```javascript
export const APP_CONFIG = {
  REFRESH_INTERVAL: 300000, // 5 minutes in milliseconds
};
```

### Styling & Theming

The application uses custom CSS with CSS variables for easy theming. Main color scheme can be modified in `src/App.css`:

```css
.app {
  background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
}
```

### Adding New Features

The modular architecture makes it easy to extend functionality:

1. **New Weather Metrics**: Update the WeatherAPI service and add formatting utilities
2. **Additional Forecast Periods**: Modify the forecast components and API calls
3. **New Location Features**: Extend the location search hook and service
4. **UI Enhancements**: Add new components following the existing patterns

## 🌐 Deployment

This project is deployed on **Vercel** for optimal performance and reliability using a secure deployment strategy.

### 🔐 Production Deployment Branch

**⚠️ You are currently viewing the `deployment` branch** - This branch contains the production-ready configuration with API keys and deployment settings.

This project uses a **secure two-branch deployment strategy**:

- **Development Branch**: `development` - Main development work, no sensitive data
- **Deployment Branch**: `deployment` - **THIS BRANCH** - Contains production configuration and API keys
- **Live Production**: **Currently deployed from this branch** ➜ [View Live App](https://simple-weather-reporter.vercel.app/)

### 🚀 Current Deployment Status

- ✅ **Branch**: `deployment` (production-ready)
- ✅ **Platform**: Vercel
- ✅ **Status**: Live and operational
- ✅ **API Configuration**: Configured and secured
- ✅ **Environment**: Production-optimized

### Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sheshan1/simple-weather-reporter&project-name=weather-reporter&repository-name=simple-weather-reporter)

#### Option 1: Fork This Production Branch (Quickest)
1. Fork this repository (you'll get the `deployment` branch)
2. Replace the API key with your own WeatherAPI.com key
3. Connect to Vercel and deploy directly
4. Your app will be live immediately!

#### Option 2: Clone and Customize
1. Clone this repository: `git clone -b deployment https://github.com/sheshan1/simple-weather-reporter.git`
2. Replace API configurations with your own
3. Push to your repository
4. Connect to Vercel and deploy

#### Option 3: Start from Development Branch
1. Switch to `development` branch for clean development setup
2. Follow development setup instructions
3. Create your own deployment branch when ready

### Environment Variables for Deployment

| Variable | Description | Status | Notes |
|----------|-------------|---------|-------|
| `WEATHER_API_KEY` | WeatherAPI.com API key | ✅ Configured | Replace with your key when forking |

## 🔒 Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `WEATHER_API_KEY` | WeatherAPI.com API key | Yes | `1234567890abcdef1234567890abcdef` |

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **WeatherAPI.com** for providing reliable weather data
- **React team** for the amazing framework
- **Vercel** for seamless deployment platform
- **React Icons** for the beautiful icon library

---

**Built with ❤️ using React and modern web technologies**

*Star ⭐ this repository if you found it helpful!*
