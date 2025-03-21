
interface WeatherData {
  name: string;
  temp: number;
  tempMin: number;
  tempMax: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  country: string;
}

// This is a mock function that would normally fetch from a real weather API
export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  console.log(`Fetching weather data for ${city}...`);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Static weather data for demo purposes
  const weatherData: Record<string, WeatherData> = {
    "Santorini": {
      name: "Santorini",
      temp: 25,
      tempMin: 22,
      tempMax: 28,
      description: "Sunny",
      icon: "01d", // clear sky
      humidity: 45,
      windSpeed: 6.2,
      country: "GR"
    },
    "Kyoto": {
      name: "Kyoto",
      temp: 19,
      tempMin: 17,
      tempMax: 23,
      description: "Partly cloudy",
      icon: "02d", // few clouds
      humidity: 68,
      windSpeed: 4.1,
      country: "JP"
    },
    "Bali": {
      name: "Bali",
      temp: 29,
      tempMin: 26,
      tempMax: 31,
      description: "Light rain",
      icon: "10d", // rain
      humidity: 78,
      windSpeed: 3.5,
      country: "ID"
    },
    "Marrakech": {
      name: "Marrakech",
      temp: 33,
      tempMin: 28,
      tempMax: 37,
      description: "Clear sky",
      icon: "01d", // clear sky
      humidity: 15,
      windSpeed: 5.8,
      country: "MA"
    },
    "Queenstown": {
      name: "Queenstown",
      temp: 15,
      tempMin: 9,
      tempMax: 18,
      description: "Few clouds",
      icon: "02d", // few clouds
      humidity: 55,
      windSpeed: 8.2,
      country: "NZ"
    },
    "Rome": {
      name: "Rome",
      temp: 26,
      tempMin: 22,
      tempMax: 30,
      description: "Clear sky",
      icon: "01d", // clear sky
      humidity: 48,
      windSpeed: 4.5,
      country: "IT"
    }
  };
  
  // Return data for the requested city, or default to Rome if city doesn't exist in our mock data
  return weatherData[city] || weatherData["Rome"];
};

// Get weather icon URL
export const getWeatherIconUrl = (icon: string): string => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
};
