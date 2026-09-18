export type FragranceFamily = 'Woody' | 'Fresh & Aquatic' | 'Amber & Oriental' | 'Floral' | 'Smoky' | 'Aromatic';
export type Category = 'All' | 'Men' | 'Women' | 'Attars' | 'Discovery Set' | 'Deals' | 'International';

export interface FragranceNote {
  name: string;
  category: 'top' | 'heart' | 'base';
  description?: string;
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: Category;
  scentFamily: FragranceFamily;
  headlineNotes: string; // e.g. "WOODY · AMBER · SPICY"
  price: number; // PKR
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  volume: string; // e.g. "50 ML / 1.7 FL. OZ."
  concentration: 'Eau de Parfum' | 'Extrait de Parfum' | 'Pure Perfume Oil' | 'Discovery Discovery Box';
  image: string;
  transparentImage?: string;
  environmentBg?: string;
  accentColor: string; // hex
  shortDescription: string;
  story: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  longevity: string; // e.g. "12+ Hours"
  longevityScore: number; // 1-10
  projection: string; // e.g. "2.5 - 3 Meters (Heavy)"
  projectionScore: number; // 1-10
  bestSeason: string; // e.g. "Autumn / Winter / Evening"
  occasion: string; // e.g. "Black Tie, Date Night, Executive"
  isMostWanted?: boolean;
  isHero?: boolean;
  isNewArrival?: boolean;
  stock: number;
  depthMeters?: number; // for ocean section
  reviews: Review[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

export type PageView = 'home' | 'shop' | 'product' | 'about' | 'journal' | 'contact' | 'faq';
