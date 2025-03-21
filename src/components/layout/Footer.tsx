
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-travel-warm-gray text-travel-soft-black">
      <div className="container mx-auto section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-serif font-bold">Wanderlust</Link>
            <p className="text-gray-600 max-w-xs">
              Discover the world's most breathtaking destinations and plan your next unforgettable journey.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-600 hover:text-travel-blue transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-travel-blue transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-travel-blue transition-colors duration-300">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/destinations" 
                  className="text-gray-600 hover:text-travel-blue transition-colors duration-300"
                >
                  Destinations
                </Link>
              </li>
              <li>
                <Link 
                  to="/guides" 
                  className="text-gray-600 hover:text-travel-blue transition-colors duration-300"
                >
                  Travel Guides
                </Link>
              </li>
              <li>
                <a 
                  href="#deals" 
                  className="text-gray-600 hover:text-travel-blue transition-colors duration-300"
                >
                  Travel Deals
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Explore</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-travel-blue transition-colors duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-travel-blue transition-colors duration-300"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-travel-blue transition-colors duration-300"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 text-travel-blue flex-shrink-0 mt-1" />
                <span className="text-gray-600">1234 Traveler's Way, Globetrotter City, Earth</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-travel-blue flex-shrink-0" />
                <a 
                  href="mailto:hello@wanderlust.com" 
                  className="text-gray-600 hover:text-travel-blue transition-colors duration-300"
                >
                  hello@wanderlust.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-travel-blue flex-shrink-0" />
                <a 
                  href="tel:+1234567890" 
                  className="text-gray-600 hover:text-travel-blue transition-colors duration-300"
                >
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Wanderlust. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
