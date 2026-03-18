import { Component, input, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-screenshots',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Grid of Thumbnails -->
    <div class="layout-container">
      <div class="columns-1 md:columns-2 gap-12 space-y-12">
        @for (screenshot of screenshots(); track screenshot) {
          <div
            class="relative break-inside-avoid bg-white border-2 border-secondary/10 group cursor-zoom-in hover:border-primary transition-all duration-500 p-2 overflow-hidden rounded-none shadow-[8px_8px_0px_0px_rgba(10,31,68,0.03)] focus:outline-none focus:ring-2 focus:ring-primary"
            (click)="openZoom(screenshot)"
            (keydown.enter)="openZoom(screenshot)"
            (keydown.space)="openZoom(screenshot); $event.preventDefault()"
            tabindex="0"
            role="button"
            aria-label="Powiększ zdjęcie"
          >
            <div
              class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none"
            >
              <div
                class="bg-secondary text-white px-8 py-4 border-2 border-primary font-mono text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl"
              >
                [ ZOBACZ ]
              </div>
            </div>
            <img
              [src]="screenshot"
              loading="lazy"
              class="w-full h-auto transform transition-transform duration-1000 group-hover:scale-[1.02] filter contrast-110 grayscale-[0.3] group-hover:grayscale-0"
              alt="Zdjęcie projektu"
            />
          </div>
        }
      </div>
    </div>

    <!-- THE LIGHTBOX (Minimalist Approach) -->
    @if (selectedImage(); as img) {
      <div
        class="fixed inset-0 z-[9999999] bg-secondary/98 backdrop-blur-3xl flex flex-col focus:outline-none"
        [style.overflow-y]="isZoomed() ? 'auto' : 'hidden'"
        (click)="closeZoom()"
        (keydown.escape)="closeZoom()"
        tabindex="-1"
        #lightbox
      >
        <!-- Main Stage -->
        <div class="flex-1 flex w-full p-4 md:p-12 lg:p-20">
          <img
            [src]="img"
            class="m-auto bg-white border-4 border-white shadow-[0_0_100px_rgba(0,0,0,0.5)] transition-all duration-300 select-none block shrink-0 focus:outline-none focus:ring-4 focus:ring-primary"
            [class.cursor-zoom-in]="!isZoomed()"
            [class.cursor-zoom-out]="isZoomed()"
            [style.max-width]="isZoomed() ? 'none' : '90vw'"
            [style.max-height]="isZoomed() ? 'none' : '85vh'"
            [style.width]="isZoomed() ? '150vw' : 'auto'"
            (click)="toggleZoom($event)"
            (keydown.enter)="toggleZoom($event)"
            (keydown.space)="toggleZoom($event); $event.preventDefault()"
            tabindex="0"
            role="button"
            [attr.aria-label]="isZoomed() ? 'Zmniejsz zdjęcie' : 'Powiększ zdjęcie'"
            alt="Podgląd projektu"
          />
        </div>
      </div>
    }
  `,
  host: { '(document:keydown.escape)': 'onEscape()' },
})
export class ProjectScreenshots {
  readonly screenshots = input.required<string[]>();
  readonly selectedImage = signal<string | null>(null);
  readonly isZoomed = signal(false);

  openZoom(image: string) {
    this.selectedImage.set(image);
    this.isZoomed.set(false);
    document.body.style.overflow = 'hidden';
  }

  closeZoom() {
    this.selectedImage.set(null);
    this.isZoomed.set(false);
    document.body.style.overflow = '';
  }

  toggleZoom(event: Event) {
    event.stopPropagation(); // Prevents backdrop click (close)
    this.isZoomed.update((z) => !z);
  }

  onEscape() {
    if (this.selectedImage()) {
      this.closeZoom();
    }
  }
}
