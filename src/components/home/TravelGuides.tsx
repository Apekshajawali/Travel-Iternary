
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { travelGuides } from '@/lib/data';
import { Clock, ArrowRight } from 'lucide-react';

const TravelGuides = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="px-3 py-1 text-xs font-medium tracking-wider uppercase rounded-full bg-travel-sand text-travel-dark-blue mb-3">
            Travel Inspiration
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Our Travel Guides
          </h2>
          <p className="text-gray-600 max-w-2xl">
            Discover expert tips, itineraries, and insider knowledge to help you plan
            the perfect trip and make unforgettable memories.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {travelGuides.map((guide, index) => (
            <div 
              key={guide.id}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link to={`/guides/${guide.id}`}>
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className={`w-full h-full object-cover transition-transform duration-700 ease-in-out ${
                      hoveredIndex === index ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-travel-soft-black/70" />
                  <div className="absolute bottom-0 w-full p-4">
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-white/80 text-travel-soft-black mb-2">
                      {guide.destination}
                    </span>
                    <h3 className="text-lg font-bold text-white">{guide.title}</h3>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center mb-3">
                    <img
                      src={guide.authorAvatar}
                      alt={guide.authorName}
                      className="w-8 h-8 rounded-full mr-2 object-cover"
                    />
                    <span className="text-sm text-gray-600">{guide.authorName}</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-sm text-gray-600 flex items-center">
                      <Clock size={14} className="mr-1" />
                      {guide.readTime} min read
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{guide.excerpt}</p>
                  
                  <div className="flex items-center text-travel-blue font-medium group-hover:text-travel-dark-blue transition-colors duration-300">
                    Read More
                    <ArrowRight size={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <Link
            to="/guides"
            className="px-6 py-3 text-base font-medium rounded-full bg-travel-sand hover:bg-travel-sand/80 text-travel-soft-black transition-all duration-300 hover:shadow-sm"
          >
            View All Travel Guides
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TravelGuides;
