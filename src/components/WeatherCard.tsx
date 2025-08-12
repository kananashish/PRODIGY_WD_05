import React from 'react';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge, 
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  Compass,
  Sunrise,
  Sunset
} from 'lucide-react';
import { WeatherData } from '../types/weather';

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return <Sun className="w-16 h-16 text-yellow-300" />;
      case 'clouds':
        return <Cloud className="w-16 h-16 text-gray-300" />;
      case 'rain':
      case 'drizzle':
        return <CloudRain className="w-16 h-16 text-blue-300" />;
      case 'snow':
        return <CloudSnow className="w-16 h-16 text-white" />;
      default:
        return <Sun className="w-16 h-16 text-yellow-300" />;
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 shadow-2xl">
      {/* Location */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">
          {weather.location.name}
        </h1>
        <p className="text-white/70 text-sm">
          {weather.location.country} • {weather.location.localTime}
        </p>
      </div>

      {/* Main weather info */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          {getWeatherIcon(weather.current.condition)}
        </div>
        <div className="mb-4">
          <div className="text-6xl font-light text-white mb-2">
            {weather.current.temp}°
          </div>
          <div className="text-white/80 text-lg">
            Feels like {weather.current.feelsLike}°
          </div>
        </div>
        <div className="text-white/90 text-xl capitalize mb-2">
          {weather.current.description}
        </div>
      </div>

      {/* Weather details grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center mb-2">
            <Droplets className="w-5 h-5 text-blue-300 mr-2" />
            <span className="text-white/70 text-sm">Humidity</span>
          </div>
          <div className="text-white text-xl font-semibold">
            {weather.current.humidity}%
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center mb-2">
            <Compass className="w-5 h-5 text-green-300 mr-2" />
            <span className="text-white/70 text-sm">Wind</span>
          </div>
          <div className="text-white text-xl font-semibold">
            {weather.current.windSpeed} km/h
          </div>
          <div className="text-white/60 text-xs">
            {weather.current.windDirection}°
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center mb-2">
            <Eye className="w-5 h-5 text-purple-300 mr-2" />
            <span className="text-white/70 text-sm">Visibility</span>
          </div>
          <div className="text-white text-xl font-semibold">
            {weather.current.visibility} km
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center mb-2">
            <Gauge className="w-5 h-5 text-orange-300 mr-2" />
            <span className="text-white/70 text-sm">Pressure</span>
          </div>
          <div className="text-white text-xl font-semibold">
            {weather.current.pressure} hPa
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center mb-2">
            <Thermometer className="w-5 h-5 text-red-300 mr-2" />
            <span className="text-white/70 text-sm">Dew Point</span>
          </div>
          <div className="text-white text-xl font-semibold">
            {weather.current.dewPoint}°
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center mb-2">
            <Cloud className="w-5 h-5 text-gray-300 mr-2" />
            <span className="text-white/70 text-sm">Cloud Cover</span>
          </div>
          <div className="text-white text-xl font-semibold">
            {weather.current.cloudCover}%
          </div>
        </div>
      </div>

      {/* UV Index */}
      <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Sun className="w-5 h-5 text-yellow-300 mr-2" />
            <span className="text-white/70 text-sm">UV Index</span>
          </div>
          <div className="text-white text-xl font-semibold">
            {weather.current.uvIndex}
          </div>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(weather.current.uvIndex * 10, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;