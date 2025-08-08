import React from 'react';
import { Wind, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { AirQuality } from '../types/weather';

interface AirQualityCardProps {
  airQuality: AirQuality;
}

const AirQualityCard: React.FC<AirQualityCardProps> = ({ airQuality }) => {
  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return 'text-green-400 bg-green-400/20';
    if (aqi <= 100) return 'text-yellow-400 bg-yellow-400/20';
    if (aqi <= 150) return 'text-orange-400 bg-orange-400/20';
    return 'text-red-400 bg-red-400/20';
  };

  const getQualityIcon = (quality: string) => {
    switch (quality.toLowerCase()) {
      case 'good':
        return <CheckCircle className="w-6 h-6 text-green-400" />;
      case 'moderate':
        return <AlertTriangle className="w-6 h-6 text-yellow-400" />;
      default:
        return <XCircle className="w-6 h-6 text-red-400" />;
    }
  };

  const pollutants = [
    { name: 'PM2.5', value: airQuality.pm25, unit: 'μg/m³' },
    { name: 'PM10', value: airQuality.pm10, unit: 'μg/m³' },
    { name: 'O₃', value: airQuality.o3, unit: 'μg/m³' },
    { name: 'NO₂', value: airQuality.no2, unit: 'μg/m³' },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-6 shadow-2xl">
      <div className="flex items-center mb-6">
        <Wind className="w-6 h-6 text-blue-300 mr-3" />
        <h2 className="text-xl font-bold text-white">Air Quality</h2>
      </div>
      
      <div className="text-center mb-6">
        <div className={`inline-flex items-center px-4 py-2 rounded-full ${getAQIColor(airQuality.aqi)} mb-3`}>
          {getQualityIcon(airQuality.quality)}
          <span className="ml-2 font-semibold">{airQuality.quality}</span>
        </div>
        <div className="text-3xl font-bold text-white mb-1">
          {airQuality.aqi}
        </div>
        <div className="text-white/70 text-sm">
          Air Quality Index
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {pollutants.map((pollutant, index) => (
          <div key={index} className="bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="text-white/70 text-sm mb-1">
              {pollutant.name}
            </div>
            <div className="text-white font-semibold">
              {pollutant.value} {pollutant.unit}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AirQualityCard;