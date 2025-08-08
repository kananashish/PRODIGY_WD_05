import React, { useState } from 'react';
import { Map, Layers, Satellite, Cloud, Zap } from 'lucide-react';

const WeatherMap: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState('temperature');

  const mapLayers = [
    { id: 'temperature', name: 'Temperature', icon: <Map className="w-4 h-4" />, color: 'bg-red-500' },
    { id: 'precipitation', name: 'Precipitation', icon: <Cloud className="w-4 h-4" />, color: 'bg-blue-500' },
    { id: 'clouds', name: 'Clouds', icon: <Layers className="w-4 h-4" />, color: 'bg-gray-500' },
    { id: 'satellite', name: 'Satellite', icon: <Satellite className="w-4 h-4" />, color: 'bg-green-500' },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-6 shadow-2xl">
      <h2 className="text-xl font-bold text-white mb-6">Weather Map</h2>
      
      {/* Map Layer Controls */}
      <div className="flex flex-wrap gap-2 mb-6">
        {mapLayers.map((layer) => (
          <button
            key={layer.id}
            onClick={() => setActiveLayer(layer.id)}
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeLayer === layer.id
                ? 'bg-white/20 text-white border border-white/30'
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
            }`}
          >
            {layer.icon}
            <span className="ml-2">{layer.name}</span>
          </button>
        ))}
      </div>

      {/* Mock Map Display */}
      <div className="relative h-64 bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-2xl border border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
        
        {/* Mock weather patterns */}
        <div className="absolute top-8 left-12 w-16 h-16 bg-yellow-400/30 rounded-full blur-sm animate-pulse"></div>
        <div className="absolute top-16 right-16 w-12 h-12 bg-blue-400/40 rounded-full blur-sm animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-12 left-20 w-20 h-20 bg-green-400/20 rounded-full blur-sm animate-pulse animation-delay-2000"></div>
        
        {/* Center location marker */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg animate-ping"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-red-600 rounded-full"></div>
        </div>

        {/* Map overlay info */}
        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
          <div className="text-white text-sm font-medium">
            {mapLayers.find(l => l.id === activeLayer)?.name} Layer
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-white/60 text-sm">
          Interactive weather map showing {mapLayers.find(l => l.id === activeLayer)?.name.toLowerCase()} data
        </p>
      </div>
    </div>
  );
};

export default WeatherMap;