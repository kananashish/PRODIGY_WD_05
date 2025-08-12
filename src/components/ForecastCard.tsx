import React from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, Droplets, Wind } from 'lucide-react';
import { ForecastDay } from '../types/weather';

interface ForecastCardProps {
  forecast: ForecastDay[];
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast }) => {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return <Sun className="w-8 h-8 text-yellow-300" />;
      case 'clouds':
        return <Cloud className="w-8 h-8 text-gray-300" />;
      case 'rain':
      case 'drizzle':
        return <CloudRain className="w-8 h-8 text-blue-300" />;
      case 'snow':
        return <CloudSnow className="w-8 h-8 text-white" />;
      default:
        return <Sun className="w-8 h-8 text-yellow-300" />;
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-6 shadow-2xl">
      <h2 className="text-xl font-bold text-white mb-6 text-center">
        5-Day Forecast
      </h2>
      
      <div className="space-y-4">
        {forecast.map((day, index) => (
          <div 
            key={index}
            className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-4">
                <div className="group-hover:scale-110 transition-transform duration-300">
                  {getWeatherIcon(day.condition)}
                </div>
                <div>
                  <div className="text-white font-medium">
                    {day.dayName}
                  </div>
                  <div className="text-white/70 text-sm capitalize">
                    {day.description}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-white font-semibold">
                  {day.high}°
                </div>
                <div className="text-white/60 text-sm">
                  {day.low}°
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-xs text-white/60">
              <div className="flex items-center">
                <Droplets className="w-3 h-3 mr-1" />
                {day.precipitationChance}%
              </div>
              <div className="flex items-center">
                <Wind className="w-3 h-3 mr-1" />
                {day.windSpeed} km/h
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;