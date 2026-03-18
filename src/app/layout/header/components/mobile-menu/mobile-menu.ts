import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BrandLogo } from '../../../../shared/ui/brand-logo/brand-logo';

@Component({
  selector: 'app-mobile-menu',
  imports: [BrandLogo, RouterLink],
  template: `
    <div class="xl:hidden relative z-[60]" role="dialog" aria-modal="true">
      <!-- Backdrop (More industrial contrast) -->
      <div
        class="fixed inset-0 bg-secondary/40 backdrop-blur-sm transition-opacity"
        (click)="closeMenu.emit()"
        (keydown.enter)="closeMenu.emit()"
        (keydown.space)="closeMenu.emit()"
        tabindex="0"
        role="button"
        aria-label="Close menu"
      ></div>

      <!-- Drawer (Modern Workshop Style) -->
      <div
        class="fixed inset-y-0 right-0 z-[60] w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm border-l-4 border-secondary shadow-none overflow-hidden"
      >
        <!-- Technical Grid Background -->
        <div class="absolute inset-0 -z-10 bg-grid-workshop opacity-10 pointer-events-none"></div>

        <div class="flex items-center justify-between border-b-2 border-secondary/10 pb-6">
          <app-brand-logo (scrollToTop)="closeMenu.emit()"></app-brand-logo>
          <button
            type="button"
            class="p-3 text-secondary hover:text-primary transition-all border-2 border-transparent hover:border-secondary/10 hover:bg-neutral rounded-none"
            (click)="closeMenu.emit()"
          >
            <span class="sr-only">Close menu</span>
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="mt-8 flow-root">
          <div class="-my-6 divide-y divide-secondary/10">
            <div class="space-y-2 py-8">
              <div class="font-mono text-[10px] text-secondary/30 uppercase tracking-[0.4em] mb-6">
                NAWIGACJA
              </div>
              @for (item of navigation(); track item.name; let index = $index) {
                @if (item.children) {
                  <div class="py-4">
                    <span
                      class="block px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-primary font-black mb-2"
                      >{{ item.name }}</span
                    >
                    @for (child of item.children; track child.name) {
                      <a
                        [routerLink]="child.path"
                        [fragment]="child.fragment"
                        class="-mx-3 block px-3 py-3 pl-8 font-mono text-xs font-bold uppercase tracking-widest text-secondary/60 hover:bg-neutral hover:text-primary transition-all border-l-4 border-transparent hover:border-primary"
                        (click)="closeMenu.emit()"
                      >
                        {{ child.name }}
                      </a>
                    }
                  </div>
                } @else if (item.path?.startsWith('/')) {
                  <a
                    [routerLink]="item.path"
                    [fragment]="item.fragment"
                    class="-mx-3 block px-3 py-4 font-mono text-xs font-bold uppercase tracking-widest text-secondary hover:bg-neutral hover:text-primary transition-all border-l-4 border-transparent hover:border-primary"
                    (click)="closeMenu.emit()"
                  >
                    <span class="text-secondary/20 mr-3">0{{ index + 1 }}</span>
                    {{ item.name }}
                  </a>
                } @else {
                  <a
                    [href]="item.path || item.href"
                    class="-mx-3 block px-3 py-4 font-mono text-xs font-bold uppercase tracking-widest text-secondary hover:bg-neutral hover:text-primary transition-all border-l-4 border-transparent hover:border-primary"
                    (click)="closeMenu.emit()"
                  >
                    <span class="text-secondary/20 mr-3">0{{ index + 1 }}</span>
                    {{ item.name }}
                  </a>
                }
              }
            </div>

            <div class="py-10">
              <a
                href="/#contact"
                class="block px-6 py-5 font-mono text-xs font-black uppercase tracking-[0.2em] bg-accent text-white border-2 border-accent hover:bg-white hover:text-accent transition-all text-center"
                (click)="closeMenu.emit()"
              >
                UMÓW ROZMOWĘ
              </a>

              <div
                class="mt-12 pt-8 border-t border-secondary/10 flex justify-between font-mono text-[9px] text-secondary/30 uppercase tracking-[0.3em]"
              >
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  STATUS: AGENCJA GOTOWA
                </div>
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
  navigation = input.required<
    {
      name: string;
      path?: string;
      fragment?: string;
      href?: string;
      children?: { name: string; path?: string; fragment?: string; href?: string }[];
    }[]
  >();
  closeMenu = output<void>();
}
