export interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  category: string;
  pricing: 'free' | 'paid' | 'freemium';
  rating: number;
  reviews: Review[];
  features: string[];
  screenshots: string[];
  officialUrl: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  favorites: string[];
}