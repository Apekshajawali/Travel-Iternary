
import { useState, useEffect } from 'react';
import { fetchWeatherData, getWeatherIconUrl } from '@/lib/weather';
import { destinations } from '@/lib/data';
import { ChevronDown, ChevronUp, Thermometer, Droplets, Wind } from 'lucide-react';

const WeatherWidget = () => {
  const [selectedCity, setSelectedCity] = useState(destinations[0].name);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    const getWeatherData = async () => {
      setLoading(true);
      try {
        const data = await fetchWeatherData(selectedCity);
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    getWeatherData();
  }, [selectedCity]);
  
  return (
    <section className="py-12 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto glassmorphism rounded-xl overflow-hidden shadow-lg">
          <div className="p-5 border-b border-white/20 flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            <h3 className="text-xl font-medium">Current Weather</h3>
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          
          <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <div className="p-5 space-y-4">
              <div className="relative">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full py-2 pl-3 pr-10 bg-white/50 border border-white/30 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-travel-blue"
                >
                  {destinations.map((destination) => (
                    <option key={destination.id} value={destination.name}>
                      {destination.name}, {destination.country}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown size={20} className="text-gray-500" />
                </div>
              </div>
              
              {loading ? (
                <div className="py-8 flex justify-center">
                  <div className="w-10 h-10 border-4 border-travel-blue border-t-transparent rounded-full animate-spin" />
                </div>
              ) : weatherData ? (
                <div className="animate-fade-in">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-semibold">{weatherData.name}</h4>
                      <p className="text-sm text-gray-600">{weatherData.country}</p>
                    </div>
                    <div className="flex items-center">
                      <img 
                        src={getWeatherIconUrl(weatherData.icon)} 
                        alt={weatherData.description}
                        className="w-14 h-14"
                      />
                      <span className="text-3xl font-medium">{Math.round(weatherData.temp)}°</span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 capitalize mb-4">
                    {weatherData.description}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-white/40 rounded-lg p-2">
                      <Thermometer size={18} className="inline-block mb-1 text-travel-coral" />
                      <div className="text-xs text-gray-600">Min/Max</div>
                      <div className="font-medium">
                        {Math.round(weatherData.tempMin)}° / {Math.round(weatherData.tempMax)}°
                      </div>
                    </div>
                    
                    <div className="bg-white/40 rounded-lg p-2">
                      <Droplets size={18} className="inline-block mb-1 text-travel-blue" />
                      <div className="text-xs text-gray-600">Humidity</div>
                      <div className="font-medium">{weatherData.humidity}%</div>
                    </div>
                    
                    <div className="bg-white/40 rounded-lg p-2">
                      <Wind size={18} className="inline-block mb-1 text-travel-light-blue" />
                      <div className="text-xs text-gray-600">Wind</div>
                      <div className="font-medium">{weatherData.windSpeed} m/s</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-4 text-center text-gray-500">
                  Unable to load weather data
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeatherWidget;
