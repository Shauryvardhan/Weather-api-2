# Weather CLI Application

A simple Node.js command-line tool to fetch and display current weather data using the Open-Meteo API.

## Features

- ✅ No API key required
- ✅ Real-time weather data
- ✅ Current weather conditions
- ✅ Daily forecasts
- ✅ Built-in locations (New York, London, Tokyo, Sydney)
- ✅ Custom location support by coordinates
- ✅ Color-coded output with emojis

## Installation

```bash
npm install
```

## Usage

### Get weather for built-in locations:

```bash
# New York
npm start new-york

# London
npm start london

# Tokyo
npm start tokyo

# Sydney
npm start sydney
```

### Get weather for custom coordinates:

```bash
npm start get <latitude> <longitude> [location-name]
```

Example:
```bash
npm start get 40.7128 -74.0060 "New York City"
```

## Available Commands

- `npm start` - Show help menu
- `npm start new-york` - Weather for New York
- `npm start london` - Weather for London
- `npm start tokyo` - Weather for Tokyo
- `npm start sydney` - Weather for Sydney
- `npm start get <lat> <long> [location]` - Weather for custom coordinates

## Output

The CLI displays:
- Current temperature and "feels like" temperature
- Weather condition with emoji
- Wind speed and humidity
- Today's high and low temperatures
- Daily forecast condition

## Technologies

- **axios** - HTTP client for API requests
- **chalk** - Terminal string styling
- **commander** - CLI framework

## API

Data is fetched from [Open-Meteo](https://open-meteo.com/) - a free weather API with no authentication required.
