
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightCircle } from 'lucide-react';
import { destinations } from '@/lib/data';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const featuredDestinations = destinations.slice(0, 3);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(current => (current + 1) % featuredDestinations.length);
    }, 7000);
    
    return () => clearInterval(interval);
  }, [featuredDestinations.length]);
  
  const currentDestination = featuredDestinations[currentSlide];
  
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background image carousel */}
      <div className="absolute inset-0 z-0">
        {featuredDestinations.map((destination, index) => (
          <div
            key={destination.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${destination.image})` }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-30" />
          </div>
        ))}
      </div>
      
      {/* Carousel indicators */}
      <div className="absolute bottom-10 left-0 right-0 z-10 flex justify-center space-x-3">
        {featuredDestinations.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'w-8 bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="container relative z-10 mx-auto h-full flex flex-col justify-center text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-wide rounded-full bg-travel-blue bg-opacity-70 mb-4 animate-fade-in backdrop-blur-sm">
            DISCOVER THE WORLD
          </span>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-3 opacity-0 animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            Explore <span className="text-white">{currentDestination.name}</span>
          </h1>
          
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            {currentDestination.description}
          </p>
          
          <div className="flex flex-wrap gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
            <Link
              to={`/destination/${currentDestination.id}`}
              className="inline-flex items-center px-6 py-3 text-base font-medium rounded-full bg-travel-blue hover:bg-travel-blue/90 text-white transition-all duration-300 hover:shadow-lg"
            >
              Discover More
              <ArrowRightCircle size={18} className="ml-2" />
            </Link>
            
            <Link
              to="/destinations"
              className="inline-flex items-center px-6 py-3 text-base font-medium rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/20 transition-all duration-300"
            >
              View All Destinations
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
