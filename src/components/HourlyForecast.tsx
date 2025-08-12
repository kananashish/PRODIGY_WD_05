import React from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, Droplets } from 'lucide-react';
import { HourlyForecast as HourlyForecastType } from '../types/weather';

interface HourlyForecastProps {
  hourly: HourlyForecastType[];
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourly }) => {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return <Sun className="w-6 h-6 text-yellow-300" />;
      case 'clouds':
        return <Cloud className="w-6 h-6 text-gray-300" />;
      case 'rain':
      case 'drizzle':
        return <CloudRain className="w-6 h-6 text-blue-300" />;
      case 'snow':
        return <CloudSnow className="w-6 h-6 text-white" />;
      default:
        return <Sun className="w-6 h-6 text-yellow-300" />;
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-6 shadow-2xl">
      <h2 className="text-xl font-bold text-white mb-6">
        24-Hour Forecast
      </h2>
      
      <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
        {hourly.slice(0, 12).map((hour, index) => (
          <div 
            key={index}
            className="flex-shrink-0 bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group min-w-[100px]"
          >
            <div className="text-center">
              <div className="text-white/70 text-sm mb-2">
                {hour.time}
              </div>
              <div className="flex justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                {getWeatherIcon(hour.condition)}
              </div>
              <div className="text-white font-semibold mb-2">
                {hour.temp}°
              </div>
              <div className="flex items-center justify-center text-blue-300 text-xs">
                <Droplets className="w-3 h-3 mr-1" />
                {hour.precipitationChance}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;