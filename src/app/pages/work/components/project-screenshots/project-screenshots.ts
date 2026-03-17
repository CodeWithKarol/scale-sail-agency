import { Component, input, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-screenshots',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-24 lg:py-32 bg-slate-900/20 border-y border-slate-800 relative overflow-hidden">
      <!-- Technical grid background for section -->
      <div class="absolute inset-0 bg-grid-tech opacity-20 pointer-events-none"></div>

      <div class="layout-container relative z-10">
        <div class="max-w-3xl mx-auto text-center mb-20">
          <div
            class="inline-flex items-center gap-3 px-4 py-1.5 mb-8 border border-slate-800 bg-slate-900 text-[10px] font-black text-accent uppercase tracking-[0.4em] rounded-sm"
          >
            DOKUMENTACJA WIZUALNA
          </div>
          <h2 class="text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight">
            Wygląd aplikacji
          </h2>
          <p class="mt-6 text-lg text-slate-400 font-light">
            Podgląd kluczowych funkcji i paneli systemu.
          </p>
        </div>

        <div class="columns-1 md:columns-2 gap-10 space-y-10">
          @for (screenshot of screenshots(); track screenshot) {
            <div
              class="relative break-inside-avoid bg-slate-900 border border-slate-800 group cursor-zoom-in hover:border-primary transition-all duration-500 p-1 overflow-hidden rounded-sm shadow-2xl"
              (click)="openZoom(screenshot)"
              (keydown.enter)="openZoom(screenshot)"
              tabindex="0"
              role="button"
              aria-label="Powiększ zdjęcie"
            >
              <!-- Zoom Icon indicator -->
              <div
                class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none"
              >
                <div
                  class="bg-slate-950/90 backdrop-blur-md px-6 py-3 border border-accent/50 text-accent text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl"
                >
                  [ ZOBACZ ]
                </div>
              </div>

              <img
                [src]="screenshot"
                loading="lazy"
                class="w-full h-auto transform transition-transform duration-1000 group-hover:scale-[1.02] filter contrast-110 grayscale-[0.2] group-hover:grayscale-0"
                alt="Zdjęcie projektu"
              />
            </div>
          }
        </div>
      </div>

      <!-- Lightbox Modal -->
      @if (selectedImage(); as img) {
        <div class="fixed inset-0 z-[99999]" role="dialog" aria-modal="true">
          <!-- Backdrop -->
          <div
            class="absolute inset-0 bg-slate-950/95 backdrop-blur-2xl animate-in fade-in duration-300"
          >
            <div class="absolute inset-0 bg-grid-tech opacity-20 pointer-events-none"></div>
          </div>

          <!-- Controls (Fixed Top Right) -->
          <div class="fixed top-24 right-8 z-[100000] flex gap-4">
            <!-- Zoom Toggle -->
            <button
              (click)="toggleZoom($event)"
              class="flex items-center justify-center w-14 h-14 bg-slate-900 text-white hover:bg-accent hover:text-white transition-all focus:outline-none border border-slate-800 hover:border-accent shadow-2xl rounded-full cursor-pointer group"
              aria-label="Zmień powiększenie"
            >
              @if (isZoomed()) {
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                </svg>
              } @else {
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              }
            </button>

            <!-- Close -->
            <button
              (click)="closeZoom()"
              class="flex items-center justify-center w-14 h-14 bg-slate-900 text-white hover:bg-red-600 hover:text-white transition-all focus:outline-none border border-slate-800 hover:border-red-600 shadow-2xl rounded-full cursor-pointer"
              aria-label="Zamknij"
            >
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Scrollable Image Container -->
          <div
            class="absolute inset-0 z-[99999] overflow-y-auto overflow-x-hidden"
            (click)="onBackdropClick($event)"
            (keyup.enter)="onBackdropClick($event)"
            tabindex="-1"
          >
            <div class="min-h-full w-full flex items-center justify-center p-6 pt-32 pb-32">
              <!-- Scroll Indicator Pill -->
              @if (isZoomed()) {
                <div
                  class="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100000] pointer-events-none animate-in fade-in slide-in-from-bottom-4 duration-500"
                >
                  <div
                    class="flex items-center gap-3 px-6 py-3 bg-slate-950/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] border border-slate-800 shadow-2xl rounded-full"
                  >
                    <svg class="w-4 h-4 text-accent animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                    Przewiń, aby zobaczyć całość
                  </div>
                </div>
              }

              <img
                [src]="img"
                class="shadow-2xl ring-1 ring-white/10 select-none object-contain transition-all duration-500 bg-slate-900 shadow-black/60"
                [class]="
                  isZoomed()
                    ? 'w-full max-w-7xl cursor-zoom-out h-auto rounded-sm'
                    : 'max-h-[80vh] w-auto cursor-zoom-in rounded-sm'
                "
                alt="Powiększone zdjęcie projektu"
                (click)="toggleZoom($event)"
                (keyup.enter)="toggleZoom($event)"
                tabindex="0"
                role="button"
              />
            </div>
          </div>
        </div>
      }
    </section>
  `,
  host: {
    '(document:keydown.escape)': 'onEscape()',
  },
})
export class ProjectScreenshots {
  readonly screenshots = input.required<string[]>();
  readonly selectedImage = signal<string | null>(null);
  readonly isZoomed = signal(false);

  openZoom(image: string) {
    this.selectedImage.set(image);
    this.isZoomed.set(false);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  closeZoom() {
    this.selectedImage.set(null);
    this.isZoomed.set(false);
    document.body.style.overflow = ''; // Restore scrolling
  }

  onBackdropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.closeZoom();
    }
  }

  toggleZoom(event?: Event) {
    event?.stopPropagation();
    this.isZoomed.update((z) => !z);
  }

  onEscape() {
    if (this.selectedImage()) {
      this.closeZoom();
    }
  }
}
