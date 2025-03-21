
import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import DestinationGrid from '@/components/home/DestinationGrid';
import InteractiveMap from '@/components/home/InteractiveMap';
import WeatherWidget from '@/components/home/WeatherWidget';
import TravelGuides from '@/components/home/TravelGuides';
import TravelDeals from '@/components/home/TravelDeals';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Wanderlust | Discover Your Next Adventure';
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <DestinationGrid />
        <InteractiveMap />
        <WeatherWidget />
        <TravelGuides />
        <TravelDeals />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
