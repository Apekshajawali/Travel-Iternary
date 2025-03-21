
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled 
          ? "bg-white/80 backdrop-blur-lg shadow-sm py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container-padding mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl font-serif font-bold text-travel-soft-black transition-all duration-300"
        >
          Wanderlust
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-6">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/destinations" className="nav-link">Destinations</Link>
            <Link to="/guides" className="nav-link">Travel Guides</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button
              className="inline-flex items-center justify-center rounded-full bg-white/90 p-2 text-travel-soft-black hover:bg-white transition-colors duration-300"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
          </div>
        </div>
        
        <button
          className="inline-flex md:hidden items-center justify-center rounded-full bg-white/90 p-2 text-travel-soft-black hover:bg-white transition-colors duration-300"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Menu"
        >
          <Menu size={24} />
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white animate-fade-in">
          <div className="container-padding mx-auto py-5 flex justify-between items-center">
            <Link 
              to="/" 
              className="text-2xl font-serif font-bold text-travel-soft-black transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Wanderlust
            </Link>
            <button
              className="inline-flex items-center justify-center rounded-full bg-gray-100 p-2 text-travel-soft-black hover:bg-gray-200 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          
          <nav className="container-padding mx-auto mt-12 flex flex-col space-y-6">
            <Link 
              to="/" 
              className="text-2xl font-semibold hover:text-travel-blue transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/destinations" 
              className="text-2xl font-semibold hover:text-travel-blue transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Destinations
            </Link>
            <Link 
              to="/guides" 
              className="text-2xl font-semibold hover:text-travel-blue transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Travel Guides
            </Link>
          </nav>
          
          <div className="container-padding mx-auto mt-10">
            <div className="relative">
              <input
                type="text"
                placeholder="Search destinations..."
                className="w-full bg-gray-100 rounded-full px-5 py-3 outline-none focus:ring-2 focus:ring-travel-blue"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Search size={20} className="text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
