import {
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

@Component({
  selector: 'app-background-mesh',
  standalone: true,
  template: `
    <canvas #canvas class="absolute inset-0 w-full h-full pointer-events-none"></canvas>
  `,
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
export class BackgroundMesh implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private animationFrameId!: number;
  private particles: Particle[] = [];
  private mouse = { x: 0, y: 0 };
  private ngZone = inject(NgZone);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  // Configuration
  private readonly PARTICLE_COUNT = 80;
  private readonly CONNECTION_DISTANCE = 150;
  private readonly MOUSE_RADIUS = 200;

  ngOnInit() {
    if (!this.isBrowser) return;

    this.initCanvas();
    this.initParticles();

    // Run animation loop outside Angular to prevent change detection cycles
    this.ngZone.runOutsideAngular(() => {
      this.animate();
      window.addEventListener('resize', this.handleResize);
      window.addEventListener('mousemove', this.handleMouseMove);
    });
  }

  ngOnDestroy() {
    if (!this.isBrowser) return;

    cancelAnimationFrame(this.animationFrameId);
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('mousemove', this.handleMouseMove);
  }

  private handleResize = () => {
    this.initCanvas();
    this.initParticles();
  };

  private handleMouseMove = (e: MouseEvent) => {
    // We need to account for the canvas position relative to the viewport
    // Since it's fixed/absolute, clientX/Y usually works, but if there's scroll...
    // The canvas is absolute inset-0 in the hero, so it might scroll away.
    // However, mouse event clientX/Y is relative to viewport.
    // boundingClientRect will handle the offset.
    if (this.canvasRef) {
      const rect = this.canvasRef.nativeElement.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    }
  };

  private initCanvas() {
    const canvas = this.canvasRef.nativeElement;
    // Set resolution to match display density for crisp lines
    const dpr = window.devicePixelRatio || 1;
    // We set the internal resolution
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    // But we scale the context so we can draw using logical pixels
    this.ctx = canvas.getContext('2d')!;
    this.ctx.scale(dpr, dpr);
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0)';
  }

  private initParticles() {
    // Use logical width/height for calculations
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.particles = [];

    for (let i = 0; i < this.PARTICLE_COUNT; i++) {
      this.particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      });
    }
  }

  private animate = () => {
    this.update();
    this.draw();
    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  private update() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.particles.forEach((p) => {
      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Bounce off edges
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // Mouse interaction (gentle repulsion)
      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.MOUSE_RADIUS) {
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const force = (this.MOUSE_RADIUS - distance) / this.MOUSE_RADIUS;
        const directionX = forceDirectionX * force * 1;
        const directionY = forceDirectionY * force * 1;

        p.x -= directionX;
        p.y -= directionY;
      }
    });
  }

  private draw() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.ctx.clearRect(0, 0, width, height);

    // Draw connections
    this.ctx.lineWidth = 1;
    for (let i = 0; i < this.particles.length; i++) {
      const p1 = this.particles[i];

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgba(100, 200, 255, 0.6)'; // Cyan
      this.ctx.fill();

      // Check connections
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.CONNECTION_DISTANCE) {
          const opacity = 1 - distance / this.CONNECTION_DISTANCE;
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(100, 200, 255, ${opacity * 0.15})`;
          this.ctx.stroke();
        }
      }
    }
  }
}
