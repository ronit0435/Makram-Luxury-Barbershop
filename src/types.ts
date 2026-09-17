export type ServiceCategory = 'all' | 'haircut' | 'beard' | 'therapy' | 'packages';

export interface Service {
  id: string;
  name: string;
  tagline: string;
  description: string;
  durationMinutes: number;
  priceAED: number;
  category: 'haircut' | 'beard' | 'therapy' | 'packages';
  isPopular?: boolean;
  isVIP?: boolean;
  image: string;
  includes: string[];
}

export interface MasterBarber {
  id: string;
  name: string;
  title: string;
  experienceYears: number;
  specialty: string;
  bio: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  languages: string[];
  signatureStyle: string;
  chairNumber: number;
  availableDays: string[];
}

export interface VIPAddon {
  id: string;
  name: string;
  description: string;
  priceAED: number;
  category: 'suite' | 'wellness' | 'beverage' | 'fragrance';
  icon: string;
}

export interface Booking {
  id: string;
  referenceCode: string;
  services: Service[];
  barber: MasterBarber;
  date: string;
  timeSlot: string;
  isVIPSuite: boolean;
  addons: VIPAddon[];
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  specialNotes?: string;
  totalAED: number;
  status: 'confirmed' | 'cancelled';
  createdAt: string;
}

export type Currency = 'AED' | 'USD' | 'EUR' | 'GBP';

export interface CurrencyRate {
  code: Currency;
  symbol: string;
  rateFromAED: number;
}

export interface StyleRecommendation {
  faceShape: string;
  hairType: string;
  lifestyle: string;
  recommendedCut: string;
  cutDescription: string;
  recommendedBeard: string;
  beardDescription: string;
  recommendedServiceId: string;
  stylingTip: string;
  image: string;
}

export interface ClientReview {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  serviceUsed: string;
  avatar?: string;
  verified?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description?: string;
  caption?: string;
}
