
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { Destination, TravelGuide, TravelDeal } from '@/lib/types';
import { toast } from 'sonner';

interface DataContextType {
  destinations: Destination[];
  travelGuides: TravelGuide[];
  travelDeals: TravelDeal[];
  loading: {
    destinations: boolean;
    travelGuides: boolean;
    travelDeals: boolean;
  };
  error: {
    destinations: string | null;
    travelGuides: string | null;
    travelDeals: string | null;
  };
  refetch: {
    destinations: () => Promise<void>;
    travelGuides: () => Promise<void>;
    travelDeals: () => Promise<void>;
  };
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [travelGuides, setTravelGuides] = useState<TravelGuide[]>([]);
  const [travelDeals, setTravelDeals] = useState<TravelDeal[]>([]);
  
  const [loading, setLoading] = useState({
    destinations: true,
    travelGuides: true,
    travelDeals: true,
  });
  
  const [error, setError] = useState({
    destinations: null,
    travelGuides: null,
    travelDeals: null,
  });

  const fetchDestinations = async () => {
    try {
      setLoading(prev => ({ ...prev, destinations: true }));
      setError(prev => ({ ...prev, destinations: null }));
      
      const { data, error: fetchError } = await supabase
        .from('destinations')
        .select('*');
        
      if (fetchError) {
        throw fetchError;
      }
      
      if (data) {
        setDestinations(data);
      }
    } catch (err) {
      console.error('Error fetching destinations:', err);
      setError(prev => ({ ...prev, destinations: 'Failed to load destinations. Please try again later.' }));
      toast.error('Failed to load destinations');
    } finally {
      setLoading(prev => ({ ...prev, destinations: false }));
    }
  };

  const fetchTravelGuides = async () => {
    try {
      setLoading(prev => ({ ...prev, travelGuides: true }));
      setError(prev => ({ ...prev, travelGuides: null }));
      
      const { data, error: fetchError } = await supabase
        .from('travel_guides')
        .select('*');
        
      if (fetchError) {
        throw fetchError;
      }
      
      if (data) {
        setTravelGuides(data);
      }
    } catch (err) {
      console.error('Error fetching travel guides:', err);
      setError(prev => ({ ...prev, travelGuides: 'Failed to load travel guides. Please try again later.' }));
      toast.error('Failed to load travel guides');
    } finally {
      setLoading(prev => ({ ...prev, travelGuides: false }));
    }
  };

  const fetchTravelDeals = async () => {
    try {
      setLoading(prev => ({ ...prev, travelDeals: true }));
      setError(prev => ({ ...prev, travelDeals: null }));
      
      const { data, error: fetchError } = await supabase
        .from('travel_deals')
        .select('*');
        
      if (fetchError) {
        throw fetchError;
      }
      
      if (data) {
        setTravelDeals(data);
      }
    } catch (err) {
      console.error('Error fetching travel deals:', err);
      setError(prev => ({ ...prev, travelDeals: 'Failed to load travel deals. Please try again later.' }));
      toast.error('Failed to load travel deals');
    } finally {
      setLoading(prev => ({ ...prev, travelDeals: false }));
    }
  };

  useEffect(() => {
    fetchDestinations();
    fetchTravelGuides();
    fetchTravelDeals();
  }, []);

  const value = {
    destinations,
    travelGuides,
    travelDeals,
    loading,
    error,
    refetch: {
      destinations: fetchDestinations,
      travelGuides: fetchTravelGuides,
      travelDeals: fetchTravelDeals,
    },
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  
  return context;
};
