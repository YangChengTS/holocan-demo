export interface Company {
  id: string;
  name: string;
  description: string;
  country: 'CN' | 'CA';
  industry: string;
  products: string[];
  services: string[];
  profileImage?: string;
  logo?: string;
  contactInfo: {
    email: string;
    phone: string;
    website?: string;
    address: string;
  };
  established: number;
  employeeCount: number;
  annualRevenue?: string;
  tags: string[];
  matchScore?: number;
}

export interface MatchResult {
  sourceCompany: Company;
  matchedCompanies: Array<Company & { matchScore: number }>;
  matchCriteria: {
    industryRelevance: number;
    marketNeed: number;
    businessScale: number;
    productComplement: number;
    overallScore: number;
  };
}

export interface ExhibitionBooth {
  id: string;
  company: Company;
  boothType: 'standard' | 'premium' | 'enterprise';
  products: Product[];
  virtualTourUrl?: string;
  visitors: number;
  engagementRate: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  model3d?: string;
  price?: {
    amount: number;
    currency: 'CAD' | 'CNY' | 'USD';
  };
  category: string;
  tags: string[];
  specifications?: Record<string, string>;
}

export interface User {
  id: string;
  name: string;
  email: string;
  company?: Company;
  role: 'admin' | 'user' | 'visitor';
  preferences: {
    language: 'en' | 'zh';
    notifications: boolean;
    theme: 'light' | 'dark' | 'system';
  };
}

export interface NavigationLink {
  label: string;
  path: string;
  icon?: React.ReactNode;
  children?: NavigationLink[];
}

export type LanguageCode = 'en' | 'zh';

export interface TranslationKey {
  [key: string]: string | TranslationKey;
}