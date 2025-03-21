
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, CreditCard, Globe, Award, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getDestinationById } from '@/lib/data';
import { fetchWeatherData, getWeatherIconUrl } from '@/lib/weather';
import { destinations } from '@/lib/data';

const Destination = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const destination = getDestinationById(id || '');
  
  useEffect(() => {
    if (!destination) {
      navigate('/destinations');
      return;
    }
    
    window.scrollTo(0, 0);
    document.title = `${destination.name} | Wanderlust`;
    
    const getWeatherData = async () => {
      setLoading(true);
      try {
        const data = await fetchWeatherData(destination.name);
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    getWeatherData();
  }, [destination, navigate]);
  
  if (!destination) return null;
  
  const handlePrevImage = () => {
    setActiveImageIndex((current) => 
      current === 0 ? destination.gallery.length - 1 : current - 1
    );
  };
  
  const handleNextImage = () => {
    setActiveImageIndex((current) => 
      (current + 1) % destination.gallery.length
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero section */}
        <section className="relative h-[70vh]">
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${destination.image})` }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40" />
          </div>
          
          <div className="container relative z-10 h-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center text-white">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 text-xs font-medium tracking-wide rounded-full bg-travel-blue/70 mb-4 backdrop-blur-sm">
                {destination.country.toUpperCase()}
              </span>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                {destination.name}
              </h1>
              
              <p className="text-xl text-white/90 max-w-2xl">
                {destination.description}
              </p>
              
              <div className="flex items-center mt-6">
                <div className="flex items-center mr-4">
                  <Star size={20} className="text-yellow-400 fill-yellow-400 mr-1" />
                  <span className="font-medium">{destination.rating.toFixed(1)}</span>
                </div>
                <span className="text-white/60">•</span>
                <span className="ml-4 text-white/90">{destination.reviews} reviews</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Content section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-3xl font-bold mb-6">Destination Overview</h2>
                  <p className="text-gray-600">{destination.longDescription}</p>
                  
                  <div className="flex flex-wrap gap-2 my-6">
                    {destination.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-3 py-1 text-sm rounded-full bg-travel-sand text-travel-dark-blue"
                      >
                        {tag.charAt(0).toUpperCase() + tag.slice(1)}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Gallery section */}
                <div className="mt-12">
                  <h3 className="text-2xl font-bold mb-6">Gallery</h3>
                  
                  <div className="relative rounded-xl overflow-hidden">
                    <div className="aspect-[16/9] overflow-hidden">
                      <img 
                        src={destination.gallery[activeImageIndex]}
                        alt={`${destination.name} - Gallery image ${activeImageIndex + 1}`}
                        className="w-full h-full object-cover transition-all duration-500"
                      />
                    </div>
                    
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors duration-300"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors duration-300"
                      aria-label="Next image"
                    >
                      <ChevronRight size={24} />
                    </button>
                    
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {destination.gallery.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            activeImageIndex === index ? 'w-4 bg-white' : 'bg-white/50'
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Travel tips section */}
                <div className="mt-12">
                  <h3 className="text-2xl font-bold mb-6">Travel Tips</h3>
                  
                  <ul className="space-y-4">
                    {destination.travelTips.map((tip, index) => (
                      <li key={index} className="flex items-baseline">
                        <span className="text-travel-blue mr-3 font-bold">•</span>
                        <span className="text-gray-600">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  {/* Essential info card */}
                  <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <h3 className="text-xl font-bold mb-4">Essential Information</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <MapPin size={20} className="text-travel-blue mt-1 flex-shrink-0" />
                        <div className="ml-3">
                          <h4 className="font-medium">Location</h4>
                          <p className="text-gray-600">{destination.country}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Calendar size={20} className="text-travel-blue mt-1 flex-shrink-0" />
                        <div className="ml-3">
                          <h4 className="font-medium">Best Time to Visit</h4>
                          <p className="text-gray-600">{destination.bestTimeToVisit}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <CreditCard size={20} className="text-travel-blue mt-1 flex-shrink-0" />
                        <div className="ml-3">
                          <h4 className="font-medium">Currency</h4>
                          <p className="text-gray-600">{destination.localCurrency}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Globe size={20} className="text-travel-blue mt-1 flex-shrink-0" />
                        <div className="ml-3">
                          <h4 className="font-medium">Language</h4>
                          <p className="text-gray-600">{destination.language}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Weather card */}
                  <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <h3 className="text-xl font-bold mb-4">Current Weather</h3>
                    
                    {loading ? (
                      <div className="py-4 flex justify-center">
                        <div className="w-8 h-8 border-4 border-travel-blue border-t-transparent rounded-full animate-spin" />
                      </div>
                    ) : weatherData ? (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <img 
                              src={getWeatherIconUrl(weatherData.icon)} 
                              alt={weatherData.description}
                              className="w-14 h-14"
                            />
                            <span className="text-4xl font-medium ml-2">{Math.round(weatherData.temp)}°</span>
                          </div>
                          <div>
                            <p className="text-gray-600 capitalize">{weatherData.description}</p>
                            <p className="text-sm text-gray-500">
                              {Math.round(weatherData.tempMin)}° / {Math.round(weatherData.tempMax)}°
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-travel-warm-gray rounded-lg p-3">
                            <p className="text-xs text-gray-500 mb-1">Humidity</p>
                            <p className="font-medium">{weatherData.humidity}%</p>
                          </div>
                          <div className="bg-travel-warm-gray rounded-lg p-3">
                            <p className="text-xs text-gray-500 mb-1">Wind Speed</p>
                            <p className="font-medium">{weatherData.windSpeed} m/s</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="py-4 text-center text-gray-500">
                        Unable to load weather data
                      </div>
                    )}
                  </div>
                  
                  {/* Similar destinations */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-xl font-bold mb-4">Similar Destinations</h3>
                    
                    <div className="space-y-4">
                      {destinations
                        .filter(d => 
                          d.id !== destination.id && 
                          d.tags.some(tag => destination.tags.includes(tag))
                        )
                        .slice(0, 3)
                        .map(similarDest => (
                          <a
                            key={similarDest.id}
                            href={`/destination/${similarDest.id}`}
                            className="flex items-center hover:bg-travel-warm-gray/50 p-2 rounded-lg transition-colors duration-300"
                          >
                            <img
                              src={similarDest.image}
                              alt={similarDest.name}
                              className="w-16 h-16 object-cover rounded-lg mr-3"
                            />
                            <div>
                              <h4 className="font-medium">{similarDest.name}</h4>
                              <p className="text-sm text-gray-600">{similarDest.country}</p>
                            </div>
                          </a>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Destination;
