import {
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
  PLATFORM_ID,
  inject,
  viewChild,
  input,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-canvas-background',
  standalone: true,
  template: ` <canvas #canvas class="absolute inset-0 w-full h-full -z-10 bg-slate-950"></canvas> `,
  styles: [
    `
      :host {
        display: block;
        position: absolute;
        inset: 0;
        z-index: -10;
        overflow: hidden;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanvasBackground implements OnInit, OnDestroy {
  readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  // Configuration
  readonly particleCount = input<number>(150); // Increased for density
  readonly connectionDistance = input<number>(100); // Reduced slightly for cleaner look with more particles
  readonly mouseDistance = input<number>(200);

  private ngZone = inject(NgZone);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private ctx!: CanvasRenderingContext2D;
  private animationId!: number;
  private resizeObserver!: ResizeObserver;
  private width = 0;
  private height = 0;
  private time = 0; // Time for sine wave

  private particles: Particle[] = [];
  // Mouse position relative to canvas
  private mouse = { x: -1000, y: -1000 };

  ngOnInit() {
    if (!this.isBrowser) return;

    this.ngZone.runOutsideAngular(() => {
      this.initCanvas();

      // Delay init slightly to ensure correct dimensions
      setTimeout(() => {
        this.updateSize();
        this.initParticles();
        this.initEvents();
        this.animate();
      }, 0);
    });
  }

  ngOnDestroy() {
    if (!this.isBrowser) return;

    if (this.animationId) cancelAnimationFrame(this.animationId);
    if (this.resizeObserver) this.resizeObserver.disconnect();
    window.removeEventListener('mousemove', this.onMouseMove);
  }

  private initCanvas() {
    const canvas = this.canvasRef().nativeElement;
    this.ctx = canvas.getContext('2d', { alpha: false }) as CanvasRenderingContext2D;

    // Resize Observer
    this.resizeObserver = new ResizeObserver(() => {
      this.updateSize();
      if (this.particles.length === 0) this.initParticles();
    });
    this.resizeObserver.observe(canvas.parentElement || document.body);
  }

  private updateSize() {
    const canvas = this.canvasRef().nativeElement;
    const parent = canvas.parentElement || document.body;

    this.width = parent.clientWidth;
    this.height = parent.clientHeight;

    // Handle DPI
    const dpr = window.devicePixelRatio || 1;
    canvas.width = this.width * dpr;
    canvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);
  }

  private initParticles() {
    this.particles = [];
    const count = this.particleCount();
    const responsiveCount = this.width < 768 ? count / 2 : count;

    for (let i = 0; i < responsiveCount; i++) {
      this.particles.push(new Particle(this.width, this.height));
    }
  }

  private initEvents() {
    window.addEventListener('mousemove', this.onMouseMove);
  }

  private onMouseMove = (e: MouseEvent) => {
    const canvas = this.canvasRef().nativeElement;
    const rect = canvas.getBoundingClientRect();
    this.mouse.x = e.clientX - rect.left;
    this.mouse.y = e.clientY - rect.top;
  };

  private animate = () => {
    this.animationId = requestAnimationFrame(this.animate);
    this.render();
  };

  private render() {
    if (!this.ctx) return;

    this.time += 0.005; // Time step

    // Clear
    this.ctx.fillStyle = '#020617'; // slate-950
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Update and Draw Particles
    for (const particle of this.particles) {
      particle.update(this.width, this.height, this.mouse, this.mouseDistance(), this.time);
      particle.draw(this.ctx);
    }

    // Draw Connections
    this.drawConnections();
  }

  private drawConnections() {
    const distThreshold = this.connectionDistance();
    const particles = this.particles;

    this.ctx.lineWidth = 1;

    // Optimization: Spatial partitioning or just limiter?
    // With 150 particles, N^2 is ~22,500 iterations, totally fine for JS.

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < distThreshold) {
          const opacity = 1 - dist / distThreshold;
          this.ctx.strokeStyle = `rgba(56, 189, 248, ${opacity * 0.3})`; // Moderate line opacity

          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }
    }
  }
}

class Particle {
  x: number;
  y: number;
  baseY: number; // Original Y for wave oscillation center
  vx: number;
  waveAmplitude: number;
  waveFrequency: number;
  phase: number;
  size: number;

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.baseY = this.y;

    // Constant horizontal flow (like wind/current)
    this.vx = 0.2 + Math.random() * 0.3;

    // Wave parameters
    this.waveAmplitude = 20 + Math.random() * 40; // Height of wave
    this.waveFrequency = 0.002 + Math.random() * 0.004; // Width of wave
    this.phase = Math.random() * Math.PI * 2; // Starting phase

    this.size = Math.random() * 2 + 1.5;
  }

  update(
    width: number,
    height: number,
    mouse: { x: number; y: number },
    mouseDist: number,
    time: number,
  ) {
    // 1. Horizontal Flow
    this.x += this.vx;

    // Wrap horizontal
    if (this.x > width) {
      this.x = 0;
      this.baseY = Math.random() * height; // New random Y when wrapping
    }

    // 2. Vertical Wave Motion
    // y = baseY + sin(x * freq + time + phase) * amplitude
    // We use x position to drive the wave phase for that "rolling" look
    const waveOffset =
      Math.sin(this.x * this.waveFrequency + time * 2 + this.phase) * this.waveAmplitude;
    this.y = this.baseY + waveOffset;

    // 3. Mouse Interaction (Repulsion)
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < mouseDist) {
      const forceDirectionX = dx / dist;
      const forceDirectionY = dy / dist;
      const force = (mouseDist - dist) / mouseDist;
      const strength = 2; // Stronger kick

      this.x += forceDirectionX * force * strength;
      this.baseY += forceDirectionY * force * strength; // Push the "lane" away too

      // Damping/Return logic is implicit because we overwrite Y next frame based on baseY,
      // so pushing baseY is the right way to persist the displacement slightly or let it drift back?
      // Actually, if we push baseY, it changes their path permanently.
      // Let's just push X and Y temporarily, but next frame Y is recalculated from baseY.
      // So effectively we are pushing the "baseY" to make it look like we parted the waves.
    }

    // Wrap vertical (baseY) if pushed off screen
    if (this.baseY < -50) this.baseY = height + 50;
    if (this.baseY > height + 50) this.baseY = -50;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = `rgba(56, 189, 248, ${0.4 + Math.random() * 0.3})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}
