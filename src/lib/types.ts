
export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  rating: number;
  reviews: number;
  latitude: number;
  longitude: number;
  tags: string[];
  bestTimeToVisit: string;
  localCurrency: string;
  language: string;
  travelTips: string[];
  created_at?: string;
}

export interface TravelGuide {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  authorName: string;
  authorAvatar: string;
  date: string;
  readTime: number;
  destination: string;
  tags: string[];
  created_at?: string;
}

export interface TravelDeal {
  id: string;
  title: string;
  destination: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  duration: string;
  validUntil: string;
  created_at?: string;
}
