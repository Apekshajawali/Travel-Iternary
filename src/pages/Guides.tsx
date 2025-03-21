
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { travelGuides } from '@/lib/data';
import { Clock, ArrowRight, Search } from 'lucide-react';

const Guides = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGuides, setFilteredGuides] = useState(travelGuides);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Travel Guides | Wanderlust';
    
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const result = travelGuides.filter(
        guide => 
          guide.title.toLowerCase().includes(term) || 
          guide.destination.toLowerCase().includes(term) ||
          guide.excerpt.toLowerCase().includes(term) ||
          guide.tags.some(tag => tag.toLowerCase().includes(term))
      );
      setFilteredGuides(result);
    } else {
      setFilteredGuides(travelGuides);
    }
  }, [searchTerm]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <section className="py-12 bg-travel-warm-gray">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Travel Guides</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Expert advice, insider tips, and detailed itineraries to inspire your next adventure.
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search guides, destinations, or topics..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-travel-blue focus:border-transparent transition-all duration-300"
                />
                <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            
            {filteredGuides.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center max-w-2xl mx-auto">
                <h3 className="text-xl font-medium mb-2">No guides found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search to find what you're looking for.
                </p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-4 py-2 text-sm bg-travel-blue text-white rounded-lg hover:bg-travel-blue/90 transition-colors duration-300"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredGuides.map((guide, index) => (
                  <div 
                    key={guide.id}
                    className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 hover-lift"
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
                          <h3 className="text-xl font-bold text-white">{guide.title}</h3>
                        </div>
                      </div>
                      
                      <div className="p-6">
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
                        
                        <p className="text-gray-600 mb-4">{guide.excerpt}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {guide.tags.map((tag, i) => (
                            <span key={i} className="px-2 py-1 text-xs rounded-full bg-travel-warm-gray text-gray-700">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center text-travel-blue font-medium group-hover:text-travel-dark-blue transition-colors duration-300">
                          Read Full Guide
                          <ArrowRight size={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Guides;
