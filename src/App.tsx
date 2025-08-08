import React, { useState, useEffect } from 'react';
import { WeatherData } from './types/weather';
import { getCurrentWeather, getWeatherByCity } from './services/weatherApi';
import { useGeolocation } from './hooks/useGeolocation';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import HourlyForecast from './components/HourlyForecast';
import AirQualityCard from './components/AirQualityCard';
import WeatherAlerts from './components/WeatherAlerts';
import AstronomyCard from './components/AstronomyCard';
import WeatherMap from './components/WeatherMap';
import SearchBar from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  const { latitude, longitude, error: geoError, loading: geoLoading, getCurrentPosition } = useGeolocation();

  // Get weather background gradient based on condition
  const getBackgroundGradient = (condition?: string) => {
    if (!condition) return 'from-blue-900 via-blue-800 to-purple-900';
    
    switch (condition.toLowerCase()) {
      case 'clear':
        return 'from-blue-400 via-blue-500 to-blue-600';
      case 'clouds':
        return 'from-gray-600 via-gray-700 to-gray-800';
      case 'rain':
      case 'drizzle':
        return 'from-gray-800 via-blue-900 to-indigo-900';
      case 'snow':
        return 'from-blue-200 via-blue-300 to-blue-500';
      case 'thunderstorm':
        return 'from-gray-900 via-purple-900 to-black';
      default:
        return 'from-blue-900 via-blue-800 to-purple-900';
    }
  };

  const loadWeatherData = async (lat?: number, lon?: number, city?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      let weatherData: WeatherData;
      if (city) {
        weatherData = await getWeatherByCity(city);
      } else if (lat && lon) {
        weatherData = await getCurrentWeather(lat, lon);
      } else {
        throw new Error('No location data available');
      }
      
      setWeather(weatherData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleLocationRequest = () => {
    getCurrentPosition();
  };

  const handleCitySearch = (city: string) => {
    loadWeatherData(undefined, undefined, city);
  };

  const handleRetry = () => {
    if (latitude && longitude) {
      loadWeatherData(latitude, longitude);
    } else {
      getCurrentPosition();
    }
  };

  // Load weather data when location is available
  useEffect(() => {
    if (latitude && longitude) {
      loadWeatherData(latitude, longitude);
    }
  }, [latitude, longitude]);

  // Handle geolocation errors
  useEffect(() => {
    if (geoError && !weather) {
      // If geolocation fails, load default city weather
      loadWeatherData(undefined, undefined, 'New York');
    }
  }, [geoError, weather]);

  // Initial load - try to get user location
  useEffect(() => {
    getCurrentPosition();
  }, []);

  const backgroundGradient = getBackgroundGradient(weather?.current.condition);

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'hourly', name: 'Hourly' },
    { id: 'map', name: 'Map' },
    { id: 'air-quality', name: 'Air Quality' },
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgroundGradient} transition-all duration-1000`}>
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/4 w-60 h-60 bg-white/3 rounded-full mix-blend-multiply filter blur-2xl animate-pulse animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            WeatherPro
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
            Advanced weather monitoring with real-time data, forecasts, and air quality insights
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <SearchBar 
            onSearch={handleCitySearch}
            onLocationRequest={handleLocationRequest}
            isLoading={loading || geoLoading}
          />
        </div>

        {/* Weather Alerts */}
        {weather && weather.alerts.length > 0 && (
          <div className="mb-8 max-w-4xl mx-auto">
            <WeatherAlerts alerts={weather.alerts} />
          </div>
        )}

        {/* Navigation Tabs */}
        {weather && (
          <div className="mb-8 max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2 bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="flex justify-center">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl">
              <LoadingSpinner />
            </div>
          </div>
        ) : error ? (
          <div className="max-w-md mx-auto">
            <ErrorMessage message={error} onRetry={handleRetry} />
          </div>
        ) : weather ? (
          <div className="max-w-7xl mx-auto">
            {activeTab === 'overview' && (
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <WeatherCard weather={weather} />
                  <HourlyForecast hourly={weather.hourly} />
                </div>
                <div className="space-y-8">
                  <ForecastCard forecast={weather.forecast} />
                  <AstronomyCard astronomy={weather.astronomy} />
                </div>
              </div>
            )}
            
            {activeTab === 'hourly' && (
              <div className="space-y-8">
                <HourlyForecast hourly={weather.hourly} />
                <div className="grid md:grid-cols-2 gap-8">
                  <WeatherCard weather={weather} />
                  <AstronomyCard astronomy={weather.astronomy} />
                </div>
              </div>
            )}
            
            {activeTab === 'map' && (
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <WeatherMap />
                </div>
                <div className="space-y-8">
                  <WeatherCard weather={weather} />
                </div>
              </div>
            )}
            
            {activeTab === 'air-quality' && (
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-8">
                  <AirQualityCard airQuality={weather.airQuality} />
                  <WeatherCard weather={weather} />
                </div>
                <div className="space-y-8">
                  <ForecastCard forecast={weather.forecast} />
                  <AstronomyCard astronomy={weather.astronomy} />
                </div>
              </div>
            )}
          </div>
        ) : null}

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-white/60 text-sm">
            Weather data provided by OpenWeatherMap API • Built with React & TypeScript
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;