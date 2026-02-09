import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { BreadcrumbItem, JsonLdSchema, SeoConfig } from './seo.models';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  private readonly document = inject(DOCUMENT);

  private readonly baseUrl = 'https://scale-sail.io';
  private readonly defaultImage = '/images/social-share-card.jpeg';

  // Signal to track current canonical URL for the active page
  private readonly _currentCanonical = signal<string>('');
  readonly currentCanonical = this._currentCanonical.asReadonly();

  // Signal to track current breadcrumbs for the active page (for UI)
  private readonly _breadcrumbs = signal<BreadcrumbItem[]>([]);
  readonly breadcrumbs = this._breadcrumbs.asReadonly();

  /**
   * Primary entry point for setting page SEO.
   * Handles strict ordering of operations to prevent race conditions or stale tags.
   */
  public setPageMetadata(config: SeoConfig): void {
    // 1. Title Strategy (Hub-and-Spoke Pattern friendly)
    const processedTitle = `${config.title} | Scale Sail Agency`;
    this.titleService.setTitle(processedTitle);

    // 2. Canonical URL (Critical for Programmatic SEO to avoid duplicate content penalties)
    const normalizedSlug =
      config.slug.startsWith('/') || !config.slug ? config.slug : `/${config.slug}`;
    const canonicalUrl = `${this.baseUrl}${normalizedSlug}`;
    this._currentCanonical.set(canonicalUrl);
    this.updateCanonicalTag(canonicalUrl);

    // 3. Meta Tags
    this.metaService.updateTag({ name: 'description', content: config.description });
    if (config.keywords?.length) {
      this.metaService.updateTag({ name: 'keywords', content: config.keywords.join(', ') });
    }

    // 4. Robots Strategy
    const robotsContent = config.noIndex ? 'noindex, nofollow' : 'index, follow';
    this.metaService.updateTag({ name: 'robots', content: robotsContent });

    // 5. Open Graph (Social Sharing)
    this.setOpenGraphTags(config, processedTitle, canonicalUrl);

    // 6. Twitter Card
    this.setTwitterTags(config, processedTitle);
  }

  /**
   * Injects JSON-LD Schema into the head.
   * Essential for "Rich Highlights" in SERPs.
   * @param scriptId - Unique ID for the script tag to allow multiple schemas (e.g. 'json-ld-faq', 'json-ld-org')
   */
  public setSchema(schema: JsonLdSchema, scriptId = 'json-ld-schema'): void {
    this.injectSchemaScript(scriptId, schema);
  }

  public setBreadcrumbs(items: BreadcrumbItem[]): void {
    // Update the visual UI signal
    this._breadcrumbs.set(items);

    const breadcrumbSchema: JsonLdSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: `${this.baseUrl}${item.path}`,
      })),
    };

    this.injectSchemaScript('json-ld-breadcrumbs', breadcrumbSchema);
  }

  private setOpenGraphTags(config: SeoConfig, processedTitle: string, canonicalUrl: string): void {
    const imageUrl = this.getImageUrl(config.image);

    this.metaService.updateTag({ property: 'og:title', content: processedTitle });
    this.metaService.updateTag({ property: 'og:description', content: config.description });
    this.metaService.updateTag({ property: 'og:url', content: canonicalUrl });
    this.metaService.updateTag({ property: 'og:type', content: config.type || 'website' });
    this.metaService.updateTag({ property: 'og:image', content: imageUrl });
  }

  private setTwitterTags(config: SeoConfig, processedTitle: string): void {
    const imageUrl = this.getImageUrl(config.image);

    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: processedTitle });
    this.metaService.updateTag({ name: 'twitter:description', content: config.description });
    this.metaService.updateTag({ name: 'twitter:image', content: imageUrl });
  }

  private getImageUrl(imagePath?: string): string {
    return imagePath ? `${this.baseUrl}${imagePath}` : `${this.baseUrl}${this.defaultImage}`;
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
