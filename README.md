# Weather App

## Overview
A modern, responsive weather application built with TypeScript, React, and other cutting-edge technologies. The app fetches real-time weather data using an external API and displays it in a user-friendly interface.

## Features
- **Real-Time Weather Data**: Fetches current weather information for any location using a weather API.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Modern UI**: Clean and intuitive interface built with React and styled with Tailwind CSS.
- **Type-Safe Codebase**: Written in TypeScript for enhanced type safety and developer experience.
- **Live Demo**: Check out the live app [here](https://unrivaled-taffy-808f05.netlify.app/).

## Technologies Used
- **TypeScript**: For type-safe JavaScript development.
- **React**: For building the user interface.
- **Tailwind CSS**: For styling and responsive design.
- **Fetch API**: For making HTTP requests to the weather API.
- **Vite**: For fast development and optimized builds.
- **ESLint & Prettier**: For code linting and formatting.

## Installation
1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd weather-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add your weather API key:
   ```env
   VITE_WEATHER_API_KEY=your_api_key_here
   ```
   *Note*: Obtain an API key from a weather service provider (e.g., OpenWeatherMap).

5. Start the development server:
   ```bash
   npm run dev
   ```

## Usage
- Open the app in your browser (default: `http://localhost:5173`).
- Enter a city name or use geolocation to fetch weather data.
- View real-time weather details, including temperature, humidity, and wind speed.

## Building for Production
To create a production-ready build:
```bash
npm run build
```
The optimized files will be generated in the `dist` folder.

## Live Demo
Explore the live version of the app [here](https://unrivaled-taffy-808f05.netlify.app/).

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.


## Acknowledgments
- Weather data provided by [OpenWeatherMap](https://openweathermap.org/).
- Built with love using modern web technologies.