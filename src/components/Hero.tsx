import { ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  connections: number[];
}

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles - more concentrated on the right side
    const initParticles = () => {
      const particles: Particle[] = [];
      const count = window.innerWidth < 768 ? 40 : 80;

      for (let i = 0; i < count; i++) {
        // Bias particles toward the right side
        const xBias = Math.random() * Math.random(); // Quadratic distribution
        particles.push({
          id: i,
          x: canvas.width * 0.3 + canvas.width * 0.7 * xBias,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.3,
          connections: [],
        });
      }
      particlesRef.current = particles;
    };

    initParticles();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      particles.forEach((particle) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Mouse interaction - subtle attraction
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
          const force = (200 - distance) / 200 * 0.02;
          particle.speedX += dx * force * 0.01;
          particle.speedY += dy * force * 0.01;
        }

        // Damping
        particle.speedX *= 0.99;
        particle.speedY *= 0.99;

        // Keep particles in bounds with soft edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Calculate opacity and blur based on horizontal position
        // Right side: high opacity, sharp. Left side: low opacity, will be blurred by CSS
        const normalizedX = particle.x / canvas.width;
        const opacityMultiplier = 0.2 + normalizedX * 0.8; // 0.2 at left, 1.0 at right
        const finalOpacity = particle.opacity * opacityMultiplier;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(25, 60%, 55%, ${finalOpacity})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const avgX = (particles[i].x + particles[j].x) / 2;
            const normalizedX = avgX / canvas.width;
            const opacityMultiplier = 0.1 + normalizedX * 0.9;
            const opacity = (1 - distance / 120) * 0.15 * opacityMultiplier;

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(25, 60%, 55%, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-16 xl:px-24 pt-20 relative overflow-hidden">
      {/* Background animation canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,1) 60%, rgba(0,0,0,1) 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,1) 60%, rgba(0,0,0,1) 100%)",
        }}
      />
      
      {/* Blur overlay for left side */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to right, hsl(var(--background)) 0%, transparent 50%)",
        }}
      />

      <motion.div 
        className="w-full max-w-none relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        
        <motion.h1 
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight mb-6 md:mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Building intelligent
          <br />
          <span className="italic">automation systems</span>
          <br />
          that work.
        </motion.h1>
        
        <motion.p 
          className="font-body text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mb-8 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          I design and develop workflow automations that streamline operations, 
          eliminate repetitive tasks, and unlock efficiency for businesses ready to scale.
        </motion.p>
        
        <motion.button 
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          className="inline-flex items-center gap-3 text-sm font-body tracking-wide group"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="link-underline">Explore my work</span>
          <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
