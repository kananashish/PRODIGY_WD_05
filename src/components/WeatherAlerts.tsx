import React from 'react';
import { AlertTriangle, AlertCircle, Shield, Zap } from 'lucide-react';
import { WeatherAlert } from '../types/weather';

interface WeatherAlertsProps {
  alerts: WeatherAlert[];
}

const WeatherAlerts: React.FC<WeatherAlertsProps> = ({ alerts }) => {
  if (alerts.length === 0) return null;

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'minor':
        return <Shield className="w-5 h-5" />;
      case 'moderate':
        return <AlertTriangle className="w-5 h-5" />;
      case 'severe':
        return <AlertCircle className="w-5 h-5" />;
      case 'extreme':
        return <Zap className="w-5 h-5" />;
      default:
        return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'minor':
        return 'bg-blue-500/20 border-blue-500/30 text-blue-300';
      case 'moderate':
        return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300';
      case 'severe':
        return 'bg-orange-500/20 border-orange-500/30 text-orange-300';
      case 'extreme':
        return 'bg-red-500/20 border-red-500/30 text-red-300';
      default:
        return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300';
    }
  };

  return (
    <div className="space-y-4">
      {alerts.map((alert, index) => (
        <div 
          key={index}
          className={`rounded-2xl border p-4 backdrop-blur-md ${getSeverityColor(alert.severity)} animate-pulse`}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              {getSeverityIcon(alert.severity)}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2 capitalize">
                {alert.title}
              </h3>
              <p className="text-sm opacity-90 mb-3">
                {alert.description}
              </p>
              <div className="text-xs opacity-70">
                Active until {new Date(alert.end).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeatherAlerts;