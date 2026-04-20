import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CalService {
  private document = inject(DOCUMENT);

  loadCalEmbed(
    containerId: string,
    userData: { name?: string | null; email?: string | null; notes?: string | null },
  ): void {
    const container = this.document.getElementById(containerId);
    if (!container) {
      setTimeout(() => this.loadCalEmbed(containerId, userData), 50);
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;

    if (!win.Cal) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (function (C: any, A: any, L: any) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const p = function (a: any, ar: any) {
          a.q.push(ar);
        };
        const d = C.document;
        C.Cal =
          C.Cal ||
          function (...args: unknown[]) {
            const cal = C.Cal;
            if (!cal.loaded) {
              cal.ns = {};
              cal.q = cal.q || [];
              const script = d.createElement('script');
              script.src = A;
              d.head.appendChild(script);
              cal.loaded = true;
            }
            if (args[0] === L) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const api: any = function (...argsInner: any[]) {
                p(api, argsInner);
              };
              const namespace = args[1];
              api.q = api.q || [];
              if (typeof namespace === 'string') {
                cal.ns[namespace] = cal.ns[namespace] || api;
              } else {
                p(cal, args);
              }
              return;
            }
            p(cal, args);
          };
      })(win, 'https://cal.eu/embed/embed.js', 'init');
    }

    win.Cal('init', { origin: 'https://cal.eu' });

    win.Cal('inline', {
      elementOrSelector: container,
      calLink: 'scale-sail/30min',
      layout: 'month_view',
      config: {
        name: userData.name,
        email: userData.email,
        notes: userData.notes,
      },
    });

    win.Cal('ui', {
      cssVarsPerTheme: {
        light: { 'cal-brand': '#0055FF' },
        dark: { 'cal-brand': '#0055FF' },
      },
      hideEventTypeDetails: false,
      layout: 'month_view',
    });
  }
}
