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
}

export const destinations: Destination[] = [
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    description: "Iconic whitewashed villages perched on volcanic cliffs overlooking the Aegean Sea.",
    longDescription: "Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape. The whitewashed, cubiform houses of its two principal towns, Fira and Oia, cling to cliffs above an underwater caldera (crater). They overlook the sea, small islands to the west and beaches made up of black, red and white lava pebbles.",
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67",
    gallery: [
      "https://images.unsplash.com/photo-1504893524553-b855bce32c67",
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21"
    ],
    rating: 4.8,
    reviews: 1245,
    latitude: 36.3932,
    longitude: 25.4615,
    tags: ["islands", "romantic", "beaches", "scenic views"],
    bestTimeToVisit: "April to October",
    localCurrency: "Euro (€)",
    language: "Greek",
    travelTips: [
      "Visit Oia for the best sunset views",
      "Try the local wines at Santo Wines Winery",
      "Take a boat tour of the caldera",
      "Visit the Red Beach and Black Beach"
    ]
  },
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    description: "Ancient city filled with classical Buddhist temples, gardens, imperial palaces, and traditional wooden houses.",
    longDescription: "Kyoto, once the capital of Japan, is a city on the island of Honshu. It's famous for its numerous classical Buddhist temples, as well as gardens, imperial palaces, Shinto shrines and traditional wooden houses. It's also known for formal traditions such as kaiseki dining, consisting of multiple courses of precise dishes, and geisha, female entertainers often found in the Gion district.",
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
    gallery: [
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb"
    ],
    rating: 4.9,
    reviews: 1879,
    latitude: 35.0116,
    longitude: 135.7681,
    tags: ["culture", "temples", "historic", "food"],
    bestTimeToVisit: "March-May and October-November",
    localCurrency: "Japanese Yen (¥)",
    language: "Japanese",
    travelTips: [
      "Visit Fushimi Inari Shrine early in the morning to avoid crowds",
      "Rent a kimono for a day to explore the Gion district",
      "Try matcha tea and traditional Japanese sweets",
      "Purchase a bus day pass for easy transportation around the city"
    ]
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    description: "Tropical paradise known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs.",
    longDescription: "Bali is an Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs. The island is home to religious sites such as cliffside Uluwatu Temple. To the south, the beachside city of Kuta has lively bars, while Seminyak, Sanur and Nusa Dua are popular resort towns. The island is also known for its yoga and meditation retreats.",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    gallery: [
      "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
      "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151"
    ],
    rating: 4.7,
    reviews: 2341,
    latitude: -8.3405,
    longitude: 115.0920,
    tags: ["beaches", "nature", "spiritual", "adventure"],
    bestTimeToVisit: "April to October",
    localCurrency: "Indonesian Rupiah (Rp)",
    language: "Indonesian, Balinese",
    travelTips: [
      "Rent a scooter to explore the island at your own pace",
      "Visit Ubud Monkey Forest, but be careful with your belongings",
      "Try traditional Balinese cuisine like Babi Guling (suckling pig)",
      "Take a day trip to the Gili Islands for snorkeling"
    ]
  },
  {
    id: "marrakech",
    name: "Marrakech",
    country: "Morocco",
    description: "A former imperial city with maze-like alleys, vibrant souks, palaces, and gardens.",
    longDescription: "Marrakech, a former imperial city in western Morocco, is a major economic center and home to mosques, palaces and gardens. The medina is a densely packed, walled medieval city dating to the Berber Empire, with maze-like alleys where thriving souks (marketplaces) sell traditional textiles, pottery and jewelry. A symbol of the city, and visible for miles, is the Moorish minaret of 12th-century Koutoubia Mosque.",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
    gallery: [
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
      "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151",
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9"
    ],
    rating: 4.6,
    reviews: 1562,
    latitude: 31.6295,
    longitude: -7.9811,
    tags: ["culture", "markets", "historic", "food"],
    bestTimeToVisit: "March to May and September to November",
    localCurrency: "Moroccan Dirham (MAD)",
    language: "Arabic, Berber, French",
    travelTips: [
      "Haggle in the souks, but remain respectful",
      "Visit Jardin Majorelle for a peaceful escape from the busy medina",
      "Try a traditional hammam experience",
      "Book a guided tour for your first visit to the medina to avoid getting lost"
    ]
  },
  {
    id: "queenstown",
    name: "Queenstown",
    country: "New Zealand",
    description: "Adventure capital set against the dramatic Southern Alps and the shores of Lake Wakatipu.",
    longDescription: "Queenstown, New Zealand, sits on the shores of the South Island's Lake Wakatipu, set against the dramatic Southern Alps. Renowned for adventure sports, it's also a base for exploring the region's vineyards and historic mining towns. There's bungee jumping off Kawarau Gorge Suspension Bridge and jet-boating on the Shotover and Dart rivers. In winter, there's skiing on the slopes of The Remarkables and Coronet Peak.",
    image: "https://images.unsplash.com/photo-1458668383970-8ddd3927deed",
    gallery: [
      "https://images.unsplash.com/photo-1458668383970-8ddd3927deed",
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21"
    ],
    rating: 4.9,
    reviews: 1765,
    latitude: -45.0312,
    longitude: 168.6626,
    tags: ["adventure", "nature", "mountains", "luxury"],
    bestTimeToVisit: "December to February (summer) or June to September (winter)",
    localCurrency: "New Zealand Dollar (NZ$)",
    language: "English, Māori",
    travelTips: [
      "Book adventure activities in advance, especially during peak season",
      "Try the famous Fergburger, but be prepared to wait in line",
      "Take the Skyline Gondola for panoramic views of the area",
      "Visit Milford Sound as a day trip"
    ]
  },
  {
    id: "rome",
    name: "Rome",
    country: "Italy",
    description: "The Eternal City with ancient ruins, art treasures, and vibrant street life.",
    longDescription: "Rome, Italy's capital, is a sprawling, cosmopolitan city with nearly 3,000 years of globally influential art, architecture and culture on display. Ancient ruins such as the Forum and the Colosseum evoke the power of the former Roman Empire. Vatican City, headquarters of the Roman Catholic Church, has St. Peter's Basilica and the Vatican Museums, which house masterpieces such as Michelangelo's Sistine Chapel frescoes.",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    gallery: [
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9"
    ],
    rating: 4.7,
    reviews: 3421,
    latitude: 41.9028,
    longitude: 12.4964,
    tags: ["historic", "culture", "food", "architecture"],
    bestTimeToVisit: "April to May and September to October",
    localCurrency: "Euro (€)",
    language: "Italian",
    travelTips: [
      "Buy tickets to major attractions online in advance to skip the lines",
      "Carry water and stay hydrated, especially in summer",
      "Try authentic Roman pasta dishes like Carbonara and Amatriciana",
      "Use public transportation or walk to explore the city"
    ]
  }
];

export const travelGuides: TravelGuide[] = [
  {
    id: "santorini-hidden-gems",
    title: "Santorini's Hidden Gems: Beyond the Blue Domes",
    excerpt: "Discover the lesser-known treasures of Greece's most photogenic island.",
    content: "Santorini is famous for its stunning sunsets and whitewashed buildings with blue domes, but there's so much more to this Cycladic island...",
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67",
    authorName: "Sophia Papadopoulos",
    authorAvatar: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    date: "May 15, 2023",
    readTime: 6,
    destination: "Santorini",
    tags: ["islands", "hidden gems", "local experiences"]
  },
  {
    id: "kyoto-seasons",
    title: "Experiencing Kyoto Through the Four Seasons",
    excerpt: "How Japan's ancient capital transforms throughout the year.",
    content: "Kyoto is magical in any season, but each time of year brings its own special atmosphere and traditions...",
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
    authorName: "Takashi Yamamoto",
    authorAvatar: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    date: "February 3, 2023",
    readTime: 8,
    destination: "Kyoto",
    tags: ["seasons", "culture", "photography"]
  },
  {
    id: "bali-spiritual-journey",
    title: "A Spiritual Journey Through Bali",
    excerpt: "Exploring the sacred temples and rituals of the Island of Gods.",
    content: "Bali is known as the Island of Gods for a reason. The Balinese Hindu culture permeates everyday life...",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    authorName: "Ayu Dewi",
    authorAvatar: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    date: "November 12, 2023",
    readTime: 7,
    destination: "Bali",
    tags: ["spiritual", "temples", "culture"]
  },
  {
    id: "queenstown-adventure",
    title: "The Ultimate Queenstown Adventure Guide",
    excerpt: "Your roadmap to adrenaline-fueled activities in New Zealand's adventure capital.",
    content: "Queenstown has rightfully earned its title as the adventure capital of the world. From bungee jumping to jet boating...",
    image: "https://images.unsplash.com/photo-1458668383970-8ddd3927deed",
    authorName: "Jack Thompson",
    authorAvatar: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    date: "January 5, 2023",
    readTime: 9,
    destination: "Queenstown",
    tags: ["adventure", "adrenaline", "outdoors"]
  }
];

export const travelDeals: TravelDeal[] = [
  {
    id: "santorini-summer",
    title: "Santorini Summer Escape",
    destination: "Santorini",
    description: "7 days of Mediterranean bliss on Greece's most picturesque island. Includes luxury accommodation and a sunset catamaran cruise.",
    price: 1299,
    originalPrice: 1799,
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67",
    duration: "7 days",
    validUntil: "August 31, 2023"
  },
  {
    id: "kyoto-spring",
    title: "Cherry Blossom Season in Kyoto",
    destination: "Kyoto",
    description: "Experience the magic of cherry blossom season in Japan's cultural heart. Includes traditional ryokan stay and guided temple tours.",
    price: 1599,
    originalPrice: 1999,
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
    duration: "10 days",
    validUntil: "December 31, 2023"
  },
  {
    id: "bali-retreat",
    title: "Bali Wellness Retreat",
    destination: "Bali",
    description: "Rejuvenate your mind and body with this all-inclusive wellness package. Daily yoga, spa treatments, and healthy cuisine included.",
    price: 899,
    originalPrice: 1299,
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    duration: "5 days",
    validUntil: "October 15, 2023"
  },
  {
    id: "marrakech-explorer",
    title: "Marrakech Explorer Package",
    destination: "Marrakech",
    description: "Dive into the colors and flavors of Morocco with this cultural immersion package. Includes guided medina tour and desert excursion.",
    price: 749,
    originalPrice: 999,
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
    duration: "6 days",
    validUntil: "November 30, 2023"
  }
];

export const filterCategories = [
  {
    id: "type",
    name: "Trip Type",
    options: [
      { value: "adventure", label: "Adventure" },
      { value: "beach", label: "Beach" },
      { value: "city", label: "City Break" },
      { value: "culture", label: "Cultural" },
      { value: "food", label: "Food & Wine" },
      { value: "nature", label: "Nature" },
      { value: "romantic", label: "Romantic" },
      { value: "wellness", label: "Wellness" }
    ]
  },
  {
    id: "budget",
    name: "Budget",
    options: [
      { value: "budget", label: "Budget" },
      { value: "mid-range", label: "Mid-range" },
      { value: "luxury", label: "Luxury" }
    ]
  },
  {
    id: "duration",
    name: "Duration",
    options: [
      { value: "weekend", label: "Weekend Getaway" },
      { value: "week", label: "1 Week" },
      { value: "twoweeks", label: "2 Weeks+" }
    ]
  },
  {
    id: "season",
    name: "Best Season",
    options: [
      { value: "spring", label: "Spring" },
      { value: "summer", label: "Summer" },
      { value: "fall", label: "Fall" },
      { value: "winter", label: "Winter" },
      { value: "yearround", label: "Year-round" }
    ]
  }
];

// Helper functions
export const getDestinationById = (id: string): Destination | undefined => {
  return destinations.find(destination => destination.id === id);
};

export const getGuideById = (id: string): TravelGuide | undefined => {
  return travelGuides.find(guide => guide.id === id);
};

export const getDestinationsByTags = (tags: string[]): Destination[] => {
  if (!tags.length) return destinations;
  
  return destinations.filter(destination => 
    tags.some(tag => destination.tags.includes(tag))
  );
};
