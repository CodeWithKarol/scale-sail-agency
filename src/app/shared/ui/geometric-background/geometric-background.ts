import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-geometric-background',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="absolute inset-0 w-full h-full -z-10 bg-slate-950 overflow-hidden pointer-events-none"
    >
      <!-- 1. Geometric Gradient Mesh (Subtle blobs) -->
      <div
        class="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px]"
      ></div>
      <div
        class="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-slate-800/20 blur-[120px]"
      ></div>

      <!-- Optional accent blob -->
      @if (variant() === 'hero') {
        <div
          class="absolute top-[30%] left-[30%] w-[40%] h-[40%] rounded-full bg-indigo-900/10 blur-[100px] animate-pulse-slow"
        ></div>
      }

      <!-- 2. Fine Technical Grid -->
      <div
        class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"
      ></div>
      <div
        class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_100%,transparent_100%)]"
      ></div>

      <!-- 3. Vignette for focus -->
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.4)_100%)]"
      ></div>
    </div>
  `,
  styles: [
    `
      .animate-pulse-slow {
        animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
      @keyframes pulse {
        0%,
        100% {
          opacity: 0.1;
        }
        50% {
          opacity: 0.3;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeometricBackground {
  readonly variant = input<'default' | 'hero' | 'subtle'>('default');
}
