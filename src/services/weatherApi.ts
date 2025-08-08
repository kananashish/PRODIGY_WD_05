import { WeatherData, WeatherApiResponse, ForecastApiResponse, ForecastDay, HourlyForecast, AirQuality, WeatherAlert, AstronomyData } from '../types/weather';

const API_KEY = 'demo'; // In production, use environment variable
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// For demo purposes, we'll use mock data
const mockWeatherData = (cityName: string = 'New York'): WeatherData => ({
  location: {
    name: cityName,
    country: 'US',
    timezone: 'America/New_York',
    localTime: new Date().toLocaleString()
  },
  current: {
    temp: Math.round(15 + Math.random() * 20),
    feelsLike: Math.round(15 + Math.random() * 20),
    condition: 'Clear',
    description: 'Clear sky',
    icon: '01d',
    humidity: Math.round(40 + Math.random() * 40),
    windSpeed: Math.round(Math.random() * 20),
    windDirection: Math.round(Math.random() * 360),
    visibility: Math.round(8 + Math.random() * 7),
    pressure: Math.round(1010 + Math.random() * 40),
    uvIndex: Math.round(Math.random() * 10),
    dewPoint: Math.round(10 + Math.random() * 15),
    cloudCover: Math.round(Math.random() * 100)
  },
  forecast: generateMockForecast(),
  hourly: generateMockHourlyForecast(),
  airQuality: generateMockAirQuality(),
  alerts: generateMockAlerts(),
  astronomy: generateMockAstronomy()
});

const generateMockForecast = (): ForecastDay[] => {
  const days = ['Today', 'Tomorrow', 'Wednesday', 'Thursday', 'Friday'];
  const conditions = ['Clear', 'Clouds', 'Rain', 'Snow', 'Drizzle'];
  const icons = ['01d', '02d', '10d', '13d', '09d'];
  
  return days.map((day, index) => ({
    date: new Date(Date.now() + index * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    dayName: day,
    high: Math.round(20 + Math.random() * 15),
    low: Math.round(5 + Math.random() * 15),
    condition: conditions[Math.floor(Math.random() * conditions.length)],
    icon: icons[Math.floor(Math.random() * icons.length)],
    description: 'Partly cloudy',
    humidity: Math.round(40 + Math.random() * 40),
    windSpeed: Math.round(Math.random() * 20),
    precipitationChance: Math.round(Math.random() * 100)
  }));
};

const generateMockHourlyForecast = (): HourlyForecast[] => {
  const conditions = ['Clear', 'Clouds', 'Rain', 'Snow', 'Drizzle'];
  const icons = ['01d', '02d', '10d', '13d', '09d'];
  
  return Array.from({ length: 24 }, (_, index) => ({
    time: new Date(Date.now() + index * 60 * 60 * 1000).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      hour12: true 
    }),
    temp: Math.round(15 + Math.random() * 20),
    condition: conditions[Math.floor(Math.random() * conditions.length)],
    icon: icons[Math.floor(Math.random() * icons.length)],
    precipitationChance: Math.round(Math.random() * 100),
    windSpeed: Math.round(Math.random() * 20)
  }));
};

const generateMockAirQuality = (): AirQuality => {
  const aqi = Math.round(20 + Math.random() * 80);
  let quality = 'Good';
  if (aqi > 100) quality = 'Unhealthy';
  else if (aqi > 50) quality = 'Moderate';
  
  return {
    aqi,
    pm25: Math.round(5 + Math.random() * 20),
    pm10: Math.round(10 + Math.random() * 30),
    o3: Math.round(20 + Math.random() * 40),
    no2: Math.round(10 + Math.random() * 30),
    so2: Math.round(5 + Math.random() * 15),
    co: Math.round(200 + Math.random() * 300),
    quality
  };
};

const generateMockAlerts = (): WeatherAlert[] => {
  const alerts = [
    {
      title: 'Heat Advisory',
      description: 'Excessive heat warning in effect. Stay hydrated and avoid prolonged sun exposure.',
      severity: 'moderate' as const,
      start: new Date().toISOString(),
      end: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    }
  ];
  
  return Math.random() > 0.7 ? alerts : [];
};

const generateMockAstronomy = (): AstronomyData => ({
  sunrise: '6:30 AM',
  sunset: '7:45 PM',
  moonrise: '9:15 PM',
  moonset: '5:30 AM',
  moonPhase: 'Waxing Crescent'
});

export const getCurrentWeather = async (lat: number, lon: number): Promise<WeatherData> => {
  // In production, replace with actual API call:
  // const response = await fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return mockWeatherData('Your Location');
};

export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  // In production, replace with actual API call:
  // const response = await fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (city.toLowerCase().includes('error')) {
    throw new Error('City not found');
  }
  
  return mockWeatherData(city);
};

export const searchCities = async (query: string): Promise<string[]> => {
  // Mock city suggestions
  const cities = [
    'New York, US', 'London, UK', 'Paris, FR', 'Tokyo, JP', 'Sydney, AU',
    'Los Angeles, US', 'Berlin, DE', 'Mumbai, IN', 'Toronto, CA', 'Moscow, RU'
  ];
  
  return cities.filter(city => 
    city.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);
};