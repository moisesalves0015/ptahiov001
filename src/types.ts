export type UserRole = 'client' | 'professional' | 'store';

export interface Review {
  id: string;
  reviewerName: string;
  reviewerAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Album {
  id: string;
  title: string;
  description: string;
  images: string[];
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  role: UserRole;
  handle?: string;
  bio?: string;
  location?: string;
  rating?: number;
  reviewCount?: number;
  reviews?: Review[];
}

export interface Professional extends User {
  specialty: string;
  rating: number;
  reviewCount: number;
  projectsCount: number;
  isVerified: boolean;
  isPremium: boolean;
  location: string;
  bio: string;
  portfolio: string[];
  albums?: Album[];
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image: string;
  images?: string[];
  storeId: string;
  storeName: string;
  rating?: number;
  reviewCount?: number;
  reviews?: Review[];
}

export interface VideoPost {
  id: string;
  videoUrl: string;
  user: User;
  description: string;
  likes: number;
  comments: number;
  thumbnail?: string;
  products?: Product[];
}

export interface QuoteRequest {
  id: string;
  clientId: string;
  clientName: string;
  description: string;
  photos: string[];
  status: 'pending' | 'responded' | 'accepted' | 'declined';
  date: string;
  category: string;
}

export interface MaterialQuote {
  id: string;
  storeId: string;
  productName: string;
  quantity: number;
  status: 'pending' | 'quoted';
  date: string;
  price?: number;
}

export interface Store extends User {
  rating: number;
  reviewCount: number;
  location: string;
  isVerified: boolean;
  categories: string[];
  description?: string;
}

export interface Banner {
  id: string;
  image: string;
  link: string;
  title?: string;
}

export type AppView = 'home' | 'feed' | 'search' | 'notifications' | 'profile' | 'professional-detail' | 'dashboard' | 'photo-request' | 'marketplace' | 'store-detail' | 'product-detail' | 'all-professionals' | 'all-stores' | 'all-categories' | 'login-store' | 'dashboard-store' | 'store-products' | 'store-products-new';
