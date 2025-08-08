import React from 'react';
import { Sunrise, Sunset, Moon, Star } from 'lucide-react';
import { AstronomyData } from '../types/weather';

interface AstronomyCardProps {
  astronomy: AstronomyData;
}

const AstronomyCard: React.FC<AstronomyCardProps> = ({ astronomy }) => {
  const astronomyData = [
    {
      icon: <Sunrise className="w-6 h-6 text-orange-300" />,
      label: 'Sunrise',
      value: astronomy.sunrise,
      color: 'text-orange-300'
    },
    {
      icon: <Sunset className="w-6 h-6 text-red-300" />,
      label: 'Sunset',
      value: astronomy.sunset,
      color: 'text-red-300'
    },
    {
      icon: <Moon className="w-6 h-6 text-blue-300" />,
      label: 'Moonrise',
      value: astronomy.moonrise,
      color: 'text-blue-300'
    },
    {
      icon: <Star className="w-6 h-6 text-purple-300" />,
      label: 'Moon Phase',
      value: astronomy.moonPhase,
      color: 'text-purple-300'
    }
  ];

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-6 shadow-2xl">
      <h2 className="text-xl font-bold text-white mb-6 text-center">
        Sun & Moon
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        {astronomyData.map((item, index) => (
          <div 
            key={index}
            className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group text-center"
          >
            <div className="flex justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
              {item.icon}
            </div>
            <div className="text-white/70 text-sm mb-1">
              {item.label}
            </div>
            <div className={`font-semibold ${item.color}`}>
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AstronomyCard;