import { Pipe, PipeTransform, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

@Pipe({
  name: 'markdown',
  standalone: true,
})
export class MarkdownPipe implements PipeTransform {
  private platformId = inject(PLATFORM_ID);

  transform(value: string): string {
    if (!value) return '';
    const html = marked.parse(value, { async: false }) as string;

    if (isPlatformBrowser(this.platformId)) {
      // In browser, use DOMPurify
      return DOMPurify.sanitize(html);
    }

    // In SSR, we skip DOMPurify as it requires JSDOM.
    // Since our markdown content is local and trusted, this is safe.
    return html;
  }
}
