
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { destinations } from '@/lib/data';
import { MapPin, Star } from 'lucide-react';

const DestinationGrid = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="px-3 py-1 text-xs font-medium tracking-wider uppercase rounded-full bg-travel-light-green text-travel-dark-blue mb-3">
            Featured Destinations
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Popular Places to Visit
          </h2>
          <p className="text-gray-600 max-w-2xl">
            Discover our handpicked selection of the world's most breathtaking destinations, 
            from iconic landmarks to hidden gems waiting to be explored.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <div 
              key={destination.id}
              className="relative overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-500 hover:shadow-md group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link to={`/destination/${destination.id}`} className="block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={destination.image}
                    alt={`${destination.name}, ${destination.country}`}
                    className={`w-full h-full object-cover transition-transform duration-700 ease-in-out ${
                      hoveredIndex === index ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-70 transition-opacity duration-300" />
                </div>
                
                <div className="absolute bottom-0 w-full p-6 text-white z-10">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-2xl font-bold group-hover:text-travel-light-blue transition-colors duration-300">
                        {destination.name}
                      </h3>
                      <div className="flex items-center mt-1">
                        <MapPin size={16} className="text-travel-coral mr-1" />
                        <span className="text-sm text-white/90">{destination.country}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star size={16} className="fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-medium">{destination.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
                
                <div className={`absolute top-0 left-0 m-6 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-sm text-xs font-medium text-travel-dark-blue transition-transform duration-300 ${
                  hoveredIndex === index ? 'translate-y-0' : '-translate-y-16'
                }`}>
                  {destination.tags[0].charAt(0).toUpperCase() + destination.tags[0].slice(1)}
                </div>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <Link 
            to="/destinations"
            className="px-6 py-3 text-base font-medium rounded-full bg-travel-warm-gray hover:bg-travel-sand text-travel-soft-black transition-all duration-300 hover:shadow-sm"
          >
            View All Destinations
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DestinationGrid;
