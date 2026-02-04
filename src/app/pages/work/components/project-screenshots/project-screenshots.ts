import { Component, input, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-screenshots',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-16 lg:py-24 bg-black/20 border-y border-white/5 relative">
      <!-- Technical grid background for section -->
      <div
        class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-20"
      ></div>

      <div class="layout-container relative z-10">
        <div class="max-w-3xl mx-auto text-center mb-16">
          <div
            class="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-white/10 bg-white/5 text-[10px] font-mono text-white/60 uppercase tracking-widest"
          >
            Visual_Data_Log
          </div>
          <h2 class="text-3xl font-bold font-mono text-white uppercase tracking-tight">
            Application Interface
          </h2>
          <p class="mt-4 text-lg text-white/60 font-light">
            Visual inspection of key system interactions.
          </p>
        </div>

        <div class="columns-1 md:columns-2 gap-8 space-y-8">
          @for (screenshot of screenshots(); track screenshot) {
            <div
              class="relative break-inside-avoid bg-secondary ring-1 ring-white/10 group cursor-zoom-in hover:ring-accent/50 transition-all duration-300 p-1 overflow-hidden"
              (click)="openZoom(screenshot)"
              (keydown.enter)="openZoom(screenshot)"
              tabindex="0"
              role="button"
              aria-label="Zoom screenshot"
            >
              <!-- Corner markers -->
              <div
                class="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/20 group-hover:border-accent transition-colors"
              ></div>
              <div
                class="absolute top-0 right-0 w-2 h-2 border-r border-t border-white/20 group-hover:border-accent transition-colors"
              ></div>
              <div
                class="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-white/20 group-hover:border-accent transition-colors"
              ></div>
              <div
                class="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/20 group-hover:border-accent transition-colors"
              ></div>

              <div
                class="absolute inset-0 bg-secondary/50 group-hover:bg-secondary/10 transition-colors pointer-events-none z-10"
              ></div>

              <!-- Zoom Icon indicator -->
              <div
                class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none"
              >
                <div
                  class="bg-black/80 backdrop-blur-sm px-4 py-2 border border-accent/50 text-accent text-xs font-mono uppercase tracking-widest"
                >
                  [ INSPECT ]
                </div>
              </div>

              <img
                [src]="screenshot"
                loading="lazy"
                class="w-full h-auto transform transition-transform duration-700 group-hover:scale-[1.01] grayscale-[0.3] group-hover:grayscale-0"
                alt="Project Screenshot"
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
            class="absolute inset-0 bg-secondary/95 backdrop-blur-xl animate-in fade-in duration-200"
          >
            <!-- Grid pattern on backdrop -->
            <div
              class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"
            ></div>
          </div>

          <!-- Controls (Fixed Top Right) -->
          <div class="fixed top-24 right-6 z-[100000] flex gap-3">
            <!-- Zoom Toggle -->
            <button
              (click)="toggleZoom($event)"
              class="flex items-center justify-center w-12 h-12 bg-black text-white hover:bg-accent hover:text-white transition-colors focus:outline-none border border-white/20 hover:border-accent shadow-2xl rounded-full cursor-pointer"
              aria-label="Toggle zoom"
            >
              @if (isZoomed()) {
                <!-- ZoomOut -->
                <svg
                  class="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"
                  />
                </svg>
              } @else {
                <!-- ZoomIn -->
                <svg
                  class="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              }
            </button>

            <!-- Close -->
            <button
              (click)="closeZoom()"
              class="flex items-center justify-center w-12 h-12 bg-black text-white hover:bg-red-600 hover:text-white transition-colors focus:outline-none border border-white/20 hover:border-red-600 shadow-2xl rounded-full cursor-pointer"
              aria-label="Close"
            >
              <!-- X -->
              <svg
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
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
            <div class="min-h-full w-full flex items-center justify-center p-4 pt-24 pb-24">
              <!-- Scroll Indicator Pill -->
              @if (isZoomed()) {
                <div
                  class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100000] pointer-events-none animate-in fade-in slide-in-from-bottom-4 duration-500"
                >
                  <div
                    class="flex items-center gap-2 px-4 py-2 bg-black/80 backdrop-blur-md text-white text-xs font-mono uppercase tracking-widest border border-white/10 shadow-xl"
                  >
                    <!-- ChevronsUpDown -->
                    <svg
                      class="w-4 h-4 text-accent"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                      />
                    </svg>
                    Scroll to scan
                  </div>
                </div>
              }

              <img
                [src]="img"
                class="shadow-2xl ring-1 ring-white/10 select-none object-contain transition-all duration-300 bg-secondary"
                [class]="
                  isZoomed()
                    ? 'w-full max-w-7xl cursor-zoom-out h-auto'
                    : 'max-h-[85vh] w-auto cursor-zoom-in'
                "
                alt="Enlarged screenshot"
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
