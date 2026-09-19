export interface FragranceNote {
  name: string;
  category: 'Citrus' | 'Woody' | 'Floral' | 'Amber' | 'Spicy' | 'Aquatic' | 'Gourmand' | 'Resin';
}

export interface FragranceAccord {
  name: string;
  percentage: number;
  color?: string;
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  longevityRating: string;
  verified: boolean;
}

export interface ProductSizeOption {
  size: string;
  price: number;
  label: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  tagline: string;
  concentration: string;
  price: number;
  originalPrice?: number;
  sizes: ProductSizeOption[];
  category: 'Men' | 'Women' | 'Attars' | 'Discovery' | 'Deals' | 'Unisex';
  olfactiveFamily: 'Woody' | 'Aquatic' | 'Amber' | 'Floral' | 'Spicy' | 'Oriental';
  environment: 'forest' | 'ocean' | 'abyss' | 'heritage' | 'atelier';
  description: string;
  story: string;
  image: string;
  secondaryImage?: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  accords: FragranceAccord[];
  longevity: string; // e.g. "12+ Hours"
  projection: string; // e.g. "Heavy (6-8 feet)"
  bestSeason: string; // e.g. "Autumn / Winter / Evening"
  occasion: string;
  rating: number;
  reviewsCount: number;
  isBestseller?: boolean;
  isHero?: boolean;
  depth?: string; // for ocean e.g. "10m", "40m"
  reviews: Review[];
}

export interface CartItem {
  product: Product;
  selectedSize: ProductSizeOption;
  quantity: number;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  content: string[];
  image: string;
}

export type SceneId = 
  | 'hero'
  | 'forest'
  | 'transition'
  | 'ocean'
  | 'most-wanted'
  | 'story'
  | 'collections';

export type ActiveView = 
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'about'
  | 'journal'
  | 'contact';
