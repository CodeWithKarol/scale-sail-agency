import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { BrandLogo } from '../../../../shared/ui/brand-logo/brand-logo';

@Component({
  selector: 'app-mobile-menu',
  imports: [BrandLogo],
  template: `
    <div class="xl:hidden relative z-[60]" role="dialog" aria-modal="true">
      <!-- Backdrop -->
      <div
        class="fixed inset-0 bg-secondary/80 backdrop-blur-sm"
        (click)="closeMenu.emit()"
        (keydown.enter)="closeMenu.emit()"
        (keydown.space)="closeMenu.emit()"
        tabindex="0"
        role="button"
        aria-label="Close menu"
      ></div>

      <!-- Drawer -->
      <div
        class="fixed inset-y-0 right-0 z-[60] w-full overflow-y-auto bg-secondary px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10 shadow-2xl"
      >
        <div class="flex items-center justify-between">
          <app-brand-logo (scrollToTop)="closeMenu.emit()"></app-brand-logo>
          <button
            type="button"
            class="-m-2.5 rounded-md p-2.5 text-neutral hover:text-white transition-colors"
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
          <div class="-my-6 divide-y divide-white/10">
            <div class="space-y-2 py-6">
              @for (item of navigation(); track item.name) {
                <a
                  [href]="item.href"
                  class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-neutral hover:bg-white/5 hover:text-white transition-colors"
                  (click)="closeMenu.emit()"
                >
                  {{ item.name }}
                </a>
              }
            </div>
            <div class="py-6">
              <a
                href="https://www.karol-modelski.scale-sail.io/#contact"
                class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-white/5 transition-colors"
                (click)="closeMenu.emit()"
              >
                Work With Me <span aria-hidden="true">&rarr;</span>
              </a>
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
