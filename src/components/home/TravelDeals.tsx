
import { travelDeals } from '@/lib/data';
import { Calendar, DollarSign } from 'lucide-react';

const TravelDeals = () => {
  return (
    <section id="deals" className="section-padding bg-travel-warm-gray">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="px-3 py-1 text-xs font-medium tracking-wider uppercase rounded-full bg-travel-light-blue text-travel-dark-blue mb-3">
            Limited Time Offers
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Exclusive Travel Deals
          </h2>
          <p className="text-gray-600 max-w-2xl">
            Take advantage of our special offers and discounts on selected destinations
            to make your dream vacation more affordable.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {travelDeals.map((deal) => (
            <div key={deal.id} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 flex flex-col h-full hover-lift">
              <div className="relative">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full aspect-[4/3] object-cover transition-all duration-500 group-hover:brightness-105"
                />
                <div className="absolute top-0 right-0 bg-travel-coral text-white font-bold py-1 px-3 rounded-bl-lg text-sm">
                  {Math.round(((deal.originalPrice - deal.price) / deal.originalPrice) * 100)}% OFF
                </div>
              </div>
              
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2">{deal.title}</h3>
                <p className="text-gray-500 text-sm mb-2">{deal.destination}</p>
                <p className="text-gray-600 text-sm mb-4 flex-grow">{deal.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Calendar size={16} className="text-travel-blue mr-1" />
                    <span className="text-sm text-gray-600">{deal.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign size={16} className="text-travel-green mr-1" />
                    <span className="text-sm text-gray-600">Valid until {deal.validUntil}</span>
                  </div>
                </div>
                
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-gray-500 line-through text-sm mr-2">${deal.originalPrice}</span>
                    <span className="text-2xl font-bold text-travel-dark-blue">${deal.price}</span>
                  </div>
                  <button className="px-4 py-2 text-sm rounded-lg bg-travel-blue text-white hover:bg-travel-blue/90 transition-colors duration-300">
                    View Deal
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelDeals;
