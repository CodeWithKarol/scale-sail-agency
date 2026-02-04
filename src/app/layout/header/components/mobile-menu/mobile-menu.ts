import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BrandLogo } from '../../../../shared/ui/brand-logo/brand-logo';

@Component({
  selector: 'app-mobile-menu',
  imports: [BrandLogo, RouterLink],
  template: `
    <div class="xl:hidden relative z-[60]" role="dialog" aria-modal="true">
      <!-- Backdrop -->
      <div
        class="fixed inset-0 bg-secondary/90 backdrop-blur-md"
        (click)="closeMenu.emit()"
        (keydown.enter)="closeMenu.emit()"
        (keydown.space)="closeMenu.emit()"
        tabindex="0"
        role="button"
        aria-label="Close menu"
      ></div>

      <!-- Drawer -->
      <div
        class="fixed inset-y-0 right-0 z-[60] w-full overflow-y-auto bg-secondary px-6 py-6 sm:max-w-sm border-l border-white/10 shadow-2xl overflow-hidden"
      >
        <!-- Technical Grid Background -->
        <div class="absolute inset-0 -z-10 bg-[size:40px_40px] bg-grid-white/[0.02]"></div>

        <div class="flex items-center justify-between border-b border-white/5 pb-6">
          <app-brand-logo (scrollToTop)="closeMenu.emit()"></app-brand-logo>
          <button
            type="button"
            class="-m-2.5 rounded-sm p-2.5 text-white/60 hover:text-white transition-colors border border-transparent hover:border-white/10 hover:bg-white/5"
            (click)="closeMenu.emit()"
          >
            <span class="sr-only">Close menu</span>
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-white/5">
            <div class="space-y-1 py-6">
              <div class="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-4">
                Navigation_Module
              </div>
              @for (item of navigation(); track item.name; let index = $index) {
                @if (item.href.startsWith('/')) {
                  <a
                    [routerLink]="item.href"
                    class="-mx-3 block rounded-sm px-3 py-3 text-sm font-mono font-bold uppercase tracking-wider text-white/60 hover:bg-white/5 hover:text-primary transition-colors border-l-2 border-transparent hover:border-primary"
                    (click)="closeMenu.emit()"
                  >
                    <span class="text-white/20 mr-2">0{{ index + 1 }}</span>
                    {{ item.name }}
                  </a>
                } @else {
                  <a
                    [href]="item.href"
                    class="-mx-3 block rounded-sm px-3 py-3 text-sm font-mono font-bold uppercase tracking-wider text-white/60 hover:bg-white/5 hover:text-primary transition-colors border-l-2 border-transparent hover:border-primary"
                    (click)="closeMenu.emit()"
                  >
                    <span class="text-white/20 mr-2">0{{ index + 1 }}</span>
                    {{ item.name }}
                  </a>
                }
              }
            </div>
            <div class="py-6">
              <a
                href="https://www.karol-modelski.scale-sail.io/#contact"
                class="-mx-3 block rounded-sm px-3 py-3 text-sm font-mono font-bold uppercase tracking-wider text-primary hover:bg-primary/10 transition-colors border border-primary/20 text-center"
                (click)="closeMenu.emit()"
              >
                [ Initiate_Contact ]
              </a>

              <div
                class="mt-8 pt-6 border-t border-white/5 flex justify-between text-[9px] font-mono text-white/30 uppercase tracking-widest"
              >
                <span>SYS: ONLINE</span>
                <span>V.1.0.4</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileMenu {
  navigation = input.required<{ name: string; href: string }[]>();
  closeMenu = output<void>();
}
