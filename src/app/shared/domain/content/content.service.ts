import { Injectable, signal } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

/**
 * Represents the data model for a programmatic page.
 * Ideally, this maps to a CMS content type or a database row.
 */
export interface ProgrammaticPageData {
  slug: string;
  keyword: string;
  industry: string;
  title: string;
  heroHeading: string;
  heroSubheading: string;
  painPoints: string[];
  solutionFeatures: string[];
  faq: { question: string; answer: string }[];
}

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  // In a real 100k page app, this would perform a fetch to a headless CMS or Edge KV store.
  // For the architecture demo, we simulate a robust data lookup based on patterns.

  getIndustryPage(industrySlug: string): Observable<ProgrammaticPageData | null> {
    // Simulator: Generate unique content based on the slug to prove scalability
    const industryName = this.formatSlug(industrySlug);
    
    const data: ProgrammaticPageData = {
      slug: `/industry/${industrySlug}`,
      keyword: `Angular Development for ${industryName}`,
      industry: industryName,
      title: `Expert Angular Development API for ${industryName} Companies`,
      heroHeading: `Scale Your ${industryName} Platform with Enterprise Angular`,
      heroSubheading: `We build high-performance, compliant, and scalable web applications specifically tailored for the ${industryName} sector.`,
      painPoints: [
        `Slow rendering times affecting ${industryName} user retention`,
        `Compliance and security risks in ${industryName} data handling`,
        `Legacy codebases slowing down feature velocity`
      ],
      solutionFeatures: [
        `Strict TypeScript compliance for mission-critical ${industryName} logic`,
        `SSR integration for maximum SEO in the ${industryName} market`,
        `Modular architecture allowing rapid compliance updates`
      ],
      faq: [
        {
          question: `Why use Angular for ${industryName}?`,
          answer: `Angular provides the strict type safety and architectural boundaries required for complex ${industryName} applications, reducing runtime errors and maintenance costs.`
        },
        {
          question: `Do you have experience in ${industryName}?`,
          answer: `Yes, we specialize in high-compliance sectors including ${industryName}, ensuring your application meets all regulatory standards.`
        }
      ]
    };

    // Simulate network delay
    return of(data).pipe(delay(200)); 
  }

  /**
   * Helper to fetch all possible routes for SSG (Prerendering).
   * In a 100k page app, this would likely be chunked or handled via ISR.
   */
  getAllIndustrySlugs(): string[] {
    return [
      'fintech',
      'healthcare',
      'ecommerce',
      'real-estate',
      'logistics',
      'edtech',
      'automotive'
    ];
  }

  private formatSlug(slug: string): string {
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
}
