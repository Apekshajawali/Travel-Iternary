
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SearchFilters from '@/components/ui/SearchFilters';
import { MapPin, Star, Loader } from 'lucide-react';
import { useData } from '@/providers/DataProvider';

const Destinations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const { destinations, loading, error, refetch } = useData();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Destinations | Wanderlust';
    
    // Filter destinations based on search term and active filters
    let result = [...destinations];
    
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        dest => 
          dest.name.toLowerCase().includes(term) || 
          dest.country.toLowerCase().includes(term) ||
          dest.description.toLowerCase().includes(term)
      );
    }
    
    if (activeFilters.length > 0) {
      result = result.filter(destination => 
        destination.tags.some(tag => activeFilters.includes(tag))
      );
    }
    
    setFilteredDestinations(result);
  }, [searchTerm, activeFilters, destinations]);
  
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };
  
  const handleFilterChange = (filters: string[]) => {
    setActiveFilters(filters);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <section className="py-12 bg-travel-warm-gray">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Destinations</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover breathtaking locations around the world and find your next perfect getaway.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div>
                <SearchFilters
                  onSearchChange={handleSearchChange}
                  onFilterChange={handleFilterChange}
                />
              </div>
              
              <div className="lg:col-span-3">
                {loading.destinations ? (
                  <div className="flex justify-center items-center py-20">
                    <Loader size={40} className="animate-spin text-travel-blue" />
                    <span className="ml-3 text-lg text-gray-600">Loading destinations...</span>
                  </div>
                ) : error.destinations ? (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
                    <h3 className="text-xl font-medium mb-2 text-red-600">Error</h3>
                    <p className="text-gray-600 mb-4">
                      {error.destinations}
                    </p>
                    <button
                      onClick={() => refetch.destinations()}
                      className="px-4 py-2 text-sm bg-travel-blue text-white rounded-lg hover:bg-travel-blue/90 transition-colors duration-300"
                    >
                      Try Again
                    </button>
                  </div>
                ) : filteredDestinations.length === 0 ? (
                  <div className="bg-white rounded-xl p-8 text-center">
                    <h3 className="text-xl font-medium mb-2">No destinations found</h3>
                    <p className="text-gray-600 mb-4">
                      Try adjusting your search or filters to find what you're looking for.
                    </p>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setActiveFilters([]);
                      }}
                      className="px-4 py-2 text-sm bg-travel-blue text-white rounded-lg hover:bg-travel-blue/90 transition-colors duration-300"
                    >
                      Clear all filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDestinations.map((destination, index) => (
                      <div 
                        key={destination.id}
                        className="relative overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-500 hover:shadow-md hover-lift group"
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
                          
                          <div className={`absolute top-0 left-0 m-6 flex gap-2 transition-transform duration-300 ${
                            hoveredIndex === index ? 'translate-y-0' : '-translate-y-16'
                          }`}>
                            {destination.tags.slice(0, 2).map((tag, i) => (
                              <span key={i} className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-sm text-xs font-medium text-travel-dark-blue">
                                {tag.charAt(0).toUpperCase() + tag.slice(1)}
                              </span>
                            ))}
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Destinations;
