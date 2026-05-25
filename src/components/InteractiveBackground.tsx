import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  depth: number;      // Layer scale from 0.1 (far) to 1.0 (near)
  baseAlpha: number;  // Base opacity derived from depth
}

export default function InteractiveBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Initialize particles with scale, speed, and opacity dictated by depth
    const initParticles = (w: number, h: number) => {
      particles = [];
      // Lower division factor (11000) yields a higher count of active nodes
      const particleCount = Math.min(500, Math.floor((w * h) / 11000));

      for (let i = 0; i < particleCount; i++) {
        const depth = Math.random() * 0.85 + 0.15; // Range: 0.15 to 1.0
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          // Speed scales with depth to simulate parallax layering
          vx: (Math.random() - 0.5) * 0.45 * depth,
          vy: (Math.random() - 0.5) * 0.45 * depth,
          radius: depth * 3 + 1,
          depth,
          baseAlpha: depth * 0.22,
        });
      }
    };

    // ResizeObserver scales the backing store to match the screen's device pixel ratio
    const resizeObserver = new ResizeObserver((entries) => {
      requestAnimationFrame(() => {
        for (const entry of entries) {
          const { width: entryWidth, height: entryHeight } = entry.contentRect;
          width = entryWidth;
          height = entryHeight;

          const dpr = window.devicePixelRatio || 1;
          canvas.width = entryWidth * dpr;
          canvas.height = entryHeight * dpr;

          ctx.resetTransform();
          ctx.scale(dpr, dpr);

          initParticles(entryWidth, entryHeight);
        }
      });
    });

    resizeObserver.observe(container);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Fine tech-grid structure with responsive sizing
      ctx.strokeStyle = "rgba(255, 255, 255, 0.012)";
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const mouse = mouseRef.current;
      const maxDistance = 105;
      const maxDistanceSq = maxDistance * maxDistance;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap or bounce off screen boundaries safely
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${p.baseAlpha})`;
        ctx.fill();

        // Check proximity and draw connect lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;

          // Performance step: check squared distance before evaluating square root
          if (distSq < maxDistanceSq) {
            const dist = Math.sqrt(distSq);
            // Average depth weights line thickness and visibility
            const avgDepth = (p.depth + p2.depth) / 2;
            const alpha = (1 - dist / maxDistance) * 0.14 * avgDepth;

            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
            ctx.lineWidth = 0.75 * avgDepth;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Mouse pull logic with distance threshold checks
        if (mouse.x > -500) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mdistSq = mdx * mdx + mdy * mdy;
          const mouseRadius = 150;
          const mouseRadiusSq = mouseRadius * mouseRadius;

          if (mdistSq < mouseRadiusSq) {
            const mdist = Math.sqrt(mdistSq);
            // Nodes physically closer to the viewer (higher depth) react more fluidly
            const pullForce = (1 - mdist / mouseRadius) * 0.02 * p.depth;
            p.vx -= mdx * pullForce * 0.08;
            p.vy -= mdy * pullForce * 0.08;

            const alpha = (1 - mdist / mouseRadius) * 0.16 * p.depth;
            ctx.strokeStyle = `rgba(52, 211, 153, ${alpha})`;
            ctx.lineWidth = 0.9 * p.depth;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0"
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full opacity-70 transition-opacity duration-300"
      />
    </div>
  );
}