export interface SeoConfig {
  title: string;
  description: string;
  image?: string;
  slug: string; // Used for canonical consistency
  type?: 'website' | 'article' | 'product';
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
