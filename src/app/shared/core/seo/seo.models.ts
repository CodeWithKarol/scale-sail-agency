export interface SeoConfig {
  title: string;
  description: string;
  image?: string;
  slug: string; // Used for canonical consistency
  type?: 'website' | 'article' | 'product' | 'profile';
  keywords?: string[];
  noIndex?: boolean;
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface JsonLdSchema {
  '@context': 'https://schema.org';
  '@type'?: string;
  [key: string]: unknown;
}

export interface LocalBusinessConfig {
  name: string;
  description: string;
  url: string;
  logo: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  telephone?: string;
  priceRange?: string;
  openingHours?: string[];
  founder?: {
    name: string;
    jobTitle: string;
  };
  areaServed?: string;
  sameAs?: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}
