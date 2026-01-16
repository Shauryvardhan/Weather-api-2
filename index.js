#!/usr/bin/env node

const axios = require('axios');
const chalk = require('chalk');
const { program } = require('commander');

const API_URL = 'https://api.open-meteo.com/v1/forecast';

async function getWeather(latitude, longitude, location = 'Your Location') {
  try {
    latitude = Number(latitude);
    longitude = Number(longitude);

    if (isNaN(latitude) || isNaN(longitude)) {
      console.error(chalk.red('Error: Invalid coordinates. Latitude and longitude must be numbers.'));
      process.exit(1);
    }

    const response = await axios.get(API_URL, {
      params: {
        latitude: latitude,
        longitude: longitude,
        current: 'temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m,apparent_temperature',
        daily: 'weather_code,temperature_2m_max,temperature_2m_min',
        timezone: 'auto',
      },
    });

    const current = response.data.current;
    const daily = response.data.daily;

    console.log(chalk.bold.cyan(`\n📍 Weather for ${location}\n`));
    
    console.log(chalk.bold('Current Weather:'));
    console.log(`  Temperature: ${chalk.yellow(current.temperature_2m + '°C')}`);
    console.log(`  Feels Like: ${chalk.yellow(current.apparent_temperature + '°C')}`);
    console.log(`  Condition: ${getWeatherDescription(current.weather_code)}`);
    console.log(`  Wind Speed: ${current.wind_speed_10m} km/h`);
    console.log(`  Humidity: ${current.relative_humidity_2m}%`);

    console.log(chalk.bold('\nToday\'s Forecast:'));
    console.log(`  High: ${chalk.red(daily.temperature_2m_max[0] + '°C')}`);
    console.log(`  Low: ${chalk.blue(daily.temperature_2m_min[0] + '°C')}`);
    console.log(`  Condition: ${getWeatherDescription(daily.weather_code[0])}\n`);
  } catch (error) {
    console.error(chalk.red('Error fetching weather data:'), error.message);
    if (error.response) {
      console.error(chalk.red('Status:'), error.response.status);
      console.error(chalk.red('Data:'), error.response.data);
    }
    process.exit(1);
  }
}

function getWeatherDescription(code) {
  const descriptions = {
    0: '☀️ Clear sky',
    1: '🌤️ Mainly clear',
    2: '⛅ Partly cloudy',
    3: '☁️ Overcast',
    45: '🌫️ Foggy',
    48: '🌫️ Depositing rime fog',
    51: '🌦️ Light drizzle',
    53: '🌧️ Moderate drizzle',
    55: '🌧️ Dense drizzle',
    61: '🌧️ Slight rain',
    63: '🌧️ Moderate rain',
    65: '⛈️ Heavy rain',
    71: '❄️ Slight snow',
    73: '❄️ Moderate snow',
    75: '❄️ Heavy snow',
    77: '❄️ Snow grains',
    80: '🌧️ Slight rain showers',
    81: '🌧️ Moderate rain showers',
    82: '⛈️ Violent rain showers',
    85: '❄️ Slight snow showers',
    86: '❄️ Heavy snow showers',
    95: '⛈️ Thunderstorm',
    96: '⛈️ Thunderstorm with slight hail',
    99: '⛈️ Thunderstorm with heavy hail',
  };
  return descriptions[code] || '❓ Unknown';
}

program
  .name('weather-cli')
  .description('A simple CLI to fetch current weather data')
  .version('1.0.0');

program
  .command('get <latitude> <longitude> [location]')
  .description('Get current weather for given coordinates')
  .action((latitude, longitude, location) => {
    getWeather(parseFloat(latitude), parseFloat(longitude), location || 'Your Location');
  });

program
  .command('new-york')
  .description('Get weather for New York')
  .action(() => {
    getWeather(40.7128, -74.0060, 'New York');
  });

program
  .command('london')
  .description('Get weather for London')
  .action(() => {
    getWeather(51.5074, -0.1278, 'London');
  });

program
  .command('tokyo')
  .description('Get weather for Tokyo')
  .action(() => {
    getWeather(35.6762, 139.6503, 'Tokyo');
  });

program
  .command('sydney')
  .description('Get weather for Sydney')
  .action(() => {
    getWeather(-33.8688, 151.2093, 'Sydney');
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
