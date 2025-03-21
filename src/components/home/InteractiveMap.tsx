
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { destinations } from '@/lib/data';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const InteractiveMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  
  const handleNextDestination = () => {
    setActiveIndex((current) => (current + 1) % destinations.length);
  };
  
  const handlePrevDestination = () => {
    setActiveIndex((current) => 
      current === 0 ? destinations.length - 1 : current - 1
    );
  };
  
  const handleExploreDestination = () => {
    navigate(`/destination/${destinations[activeIndex].id}`);
  };
  
  return (
    <section className="section-padding bg-travel-warm-gray overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="px-3 py-1 text-xs font-medium tracking-wider uppercase rounded-full bg-travel-light-blue text-travel-dark-blue mb-3">
            Interactive Map
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore the World
          </h2>
          <p className="text-gray-600 max-w-2xl">
            Navigate through our interactive map to discover fascinating destinations 
            around the globe and plan your next adventure.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Destination info column */}
            <div className="p-8 lg:col-span-2 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  {destinations[activeIndex].name}
                </h3>
                <p className="text-gray-500 mb-4">
                  {destinations[activeIndex].country}
                </p>
                <p className="text-gray-600 mb-6">
                  {destinations[activeIndex].longDescription.substring(0, 200)}...
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-travel-warm-gray rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1">Best time to visit</p>
                    <p className="font-medium">{destinations[activeIndex].bestTimeToVisit}</p>
                  </div>
                  <div className="bg-travel-warm-gray rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1">Local currency</p>
                    <p className="font-medium">{destinations[activeIndex].localCurrency}</p>
                  </div>
                </div>
                
                <button
                  onClick={handleExploreDestination}
                  className="w-full py-3 px-4 bg-travel-blue text-white rounded-lg font-medium hover:bg-travel-blue/90 transition-colors duration-300"
                >
                  Explore Destination
                </button>
              </div>
              
              <div className="flex justify-between items-center mt-8">
                <button 
                  onClick={handlePrevDestination}
                  className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                  aria-label="Previous destination"
                >
                  <ArrowLeft size={20} />
                </button>
                <span className="text-sm text-gray-500">
                  {activeIndex + 1} of {destinations.length}
                </span>
                <button 
                  onClick={handleNextDestination}
                  className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                  aria-label="Next destination"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
            
            {/* Map column */}
            <div 
              ref={mapRef}
              className="lg:col-span-3 h-[400px] lg:h-auto relative bg-travel-light-blue overflow-hidden transition-all duration-500"
            >
              {/* This would be replaced with a real interactive map implementation */}
              <div className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out opacity-90"
                style={{ 
                  backgroundImage: `url(${destinations[activeIndex].image})`,
                  transform: 'scale(1.1)'
                }}
              />
              
              <div className="absolute inset-0 bg-travel-dark-blue/30" />
              
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-travel-blue/70 backdrop-blur-md rounded-full flex items-center justify-center text-white border-4 border-white animate-pulse-gentle">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
              
              <div className="absolute bottom-6 left-6 right-6 p-4 glassmorphism rounded-lg text-travel-soft-black">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{destinations[activeIndex].name}, {destinations[activeIndex].country}</p>
                    <p className="text-sm text-gray-600">Lat: {destinations[activeIndex].latitude.toFixed(2)}, Lng: {destinations[activeIndex].longitude.toFixed(2)}</p>
                  </div>
                  <div className="flex space-x-1">
                    {destinations[activeIndex].tags.slice(0, 2).map((tag, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-white/60 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;
