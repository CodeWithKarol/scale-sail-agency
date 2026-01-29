import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, computed, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoConfig, JsonLdSchema, BreadcrumbItem } from './seo.models';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly baseUrl = 'https://scalesail.agency'; // Configuration constant
  private readonly defaultImage = '/images/og-default.jpg';
  
  // Signal to track current canonical URL for the active page
  private readonly _currentCanonical = signal<string>('');
  readonly currentCanonical = this._currentCanonical.asReadonly();

  constructor(
    private readonly titleService: Title,
    private readonly metaService: Meta,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  /**
   * Primary entry point for setting page SEO.
   * Handles strict ordering of operations to prevent race conditions or stale tags.
   */
  public setPageMetadata(config: SeoConfig): void {
    // 1. Title Strategy (Hub-and-Spoke Pattern friendly)
    const processedTitle = `${config.title} | Scale Sail Agency`;
    this.titleService.setTitle(processedTitle);

    // 2. Canonical URL (Critical for Programmatic SEO to avoid duplicate content penalties)
    const canonicalUrl = `${this.baseUrl}${config.slug}`;
    this._currentCanonical.set(canonicalUrl);
    this.updateCanonicalTag(canonicalUrl);

    // 3. Meta Tags
    this.metaService.updateTag({ name: 'description', content: config.description });
    if (config.keywords?.length) {
      this.metaService.updateTag({ name: 'keywords', content: config.keywords.join(', ') });
    }
    
    // 4. Robots Strategy
    if (config.noIndex) {
      this.metaService.updateTag({ name: 'robots', content: 'noindex, nofollow' });
    } else {
      this.metaService.updateTag({ name: 'robots', content: 'index, follow' });
    }

    // 5. Open Graph (Social Sharing)
    this.metaService.updateTag({ property: 'og:title', content: processedTitle });
    this.metaService.updateTag({ property: 'og:description', content: config.description });
    this.metaService.updateTag({ property: 'og:url', content: canonicalUrl });
    this.metaService.updateTag({ property: 'og:type', content: config.type || 'website' });
    this.metaService.updateTag({ property: 'og:image', content: config.image ? `${this.baseUrl}${config.image}` : `${this.baseUrl}${this.defaultImage}` });

    // 6. Twitter Card
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: processedTitle });
    this.metaService.updateTag({ name: 'twitter:description', content: config.description });
    this.metaService.updateTag({ name: 'twitter:image', content: config.image ? `${this.baseUrl}${config.image}` : `${this.baseUrl}${this.defaultImage}` });
  }

  /**
   * Injects JSON-LD Schema into the head.
   * Essential for "Rich Highlights" in SERPs.
   */
  public setSchema(schema: JsonLdSchema): void {
    const scriptId = 'json-ld-schema';
    let script = this.document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = this.document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }

    script.text = JSON.stringify(schema);
  }

  public setBreadcrumbs(items: BreadcrumbItem[]): void {
    const breadcrumbSchema: JsonLdSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: `${this.baseUrl}${item.path}`
      }))
    };
    
    // We append this as a secondary schema script if needed, 
    // but for simplicity in this implementation, we can assume one main schema block or merge them.
    // For now, let's keep it robust by creating a specific ID for breadcrumbs.
    this.injectSchemaScript('json-ld-breadcrumbs', breadcrumbSchema);
  }

  private updateCanonicalTag(url: string): void {
    let link: HTMLLinkElement | null = this.document.querySelector("link[rel='canonical']");
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private injectSchemaScript(id: string, schema: JsonLdSchema): void {
    let script = this.document.getElementById(id) as HTMLScriptElement;
    if (!script) {
      script = this.document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }
    script.text = JSON.stringify(schema);
  }
}
