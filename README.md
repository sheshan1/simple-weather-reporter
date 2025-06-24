# Weather Reporter 🌤️

A modern, responsive React application that provides real-time weather information for Colombo, Sri Lanka. Built with clean architecture principles and featuring a beautiful, intuitive user interface.

![Weather Reporter Preview](https://img.shields.io/badge/React-18.2.0-blue) ![License](https://img.shields.io/badge/License-MIT-green) ![API](https://img.shields.io/badge/API-WeatherAPI.com-orange)

## ✨ Features

- **Real-time Weather Data**: Current weather conditions with automatic updates every 5 minutes
- **Comprehensive Weather Metrics**: Temperature (°C/°F), humidity, wind speed, UV index, and visibility
- **Error Handling**: Robust error handling with retry functionality and user-friendly error messages
- **Loading States**: Elegant loading spinners with contextual messages
- **Performance Optimized**: Implements caching, retry logic with exponential backoff, and efficient state management

## 🛠️ Technologies Used

### Frontend
- **React 19.1.0** - Modern React with hooks and functional components
- **CSS3** - Custom CSS with gradients, flexbox, and responsive design
- **React Icons** - Beautiful weather-related icons

### External APIs
- **WeatherAPI.com** - Reliable weather data provider

### Development Tools
- **Create React App** - Development environment and build tools

## 🏗️ Architecture

The application follows clean architecture principles with clear separation of concerns:

```
src/
├── components/          # Reusable UI components
│   ├── WeatherCard.jsx     # Main weather display component
│   ├── LoadingSpinner.jsx  # Loading state component
│   └── ErrorDisplay.jsx    # Error handling component
├── hooks/              # Custom React hooks
│   └── useWeatherData.js   # Weather data management hook
├── services/           # External service integrations
│   └── WeatherAPIService.js # Weather API service class
├── utils/              # Utility functions
│   ├── weatherUtils.js     # Weather data formatting utilities
│   ├── iconUtils.jsx       # Icon management utilities
│   └── helpers.js          # General helper functions
├── constants/          # Application constants
│   └── constants.js        # API config and app settings
└── types/              # Type definitions
    └── weather.js          # Weather data type definitions
```

### Key Design Patterns

- **Singleton Pattern**: WeatherAPIService implements singleton for efficient API management
- **Custom Hooks**: Encapsulates weather data logic and state management
- **Component Composition**: Modular, reusable components
- **Error Boundaries**: Comprehensive error handling throughout the application

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 14 or higher)
- **npm** or **yarn**
- **WeatherAPI.com API Key** (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/simple-weather-reporter.git
   cd simple-weather-reporter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_WEATHER_API_KEY=your_weather_api_key_here
   ```

   > **Note**: Get your free API key from [WeatherAPI.com](https://www.weatherapi.com/)

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

This creates an optimized production build in the `build` folder.

## 🔧 Configuration

### API Configuration

The application uses WeatherAPI.com for weather data. You can customize the API configuration in `src/constants/constants.js`:

```javascript
export const API_CONFIG = {
  BASE_URL: 'http://api.weatherapi.com/v1',
  ENDPOINTS: {
    CURRENT: '/current.json'
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

## 🎨 Customization

### Styling

The application uses custom CSS with CSS variables for easy theming. Main color scheme can be modified in `src/App.css`:

```css
.app {
  background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
}
```

### Adding New Weather Metrics

1. Update the WeatherAPI service to fetch additional data
2. Add formatting utilities in `src/utils/weatherUtils.js`
3. Update the WeatherCard component to display new metrics
4. Add corresponding icons in `src/utils/iconUtils.jsx`

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_WEATHER_API_KEY` | WeatherAPI.com API key | Yes |

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Built with ❤️ using React and modern web technologies**