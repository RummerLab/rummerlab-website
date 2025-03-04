"use client";

import React, { useRef, useEffect } from "react";
import { useMousePosition } from "@/lib/hooks/use-mouse-position";

interface SparklesCoreProps {
  id: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
}

export const SparklesCore = ({
  id,
  background = "transparent",
  minSize = 0.4,
  maxSize = 1,
  particleDensity = 100,
  className,
  particleColor = "#FFF",
}: SparklesCoreProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useMousePosition();
  const particles = useRef<Array<Particle>>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === canvas) {
          const { width, height } = entry.contentRect;
          canvas.width = width;
          canvas.height = height;
          initParticles(width, height);
        }
      }
    });

    resizeObserver.observe(canvas);

    const initParticles = (width: number, height: number) => {
      particles.current = [];
      const particleCount = Math.min(Math.floor((width * height) / 10000) * particleDensity, 500);
      
      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * (maxSize - minSize) + minSize,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          opacity: Math.random() * 0.5 + 0.5,
        });
      }
    };

    const render = () => {
      if (!canvas || !ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.current.forEach((particle, i) => {
        // Move particles
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap particles around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Mouse interaction
        if (mousePosition.x && mousePosition.y) {
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const angle = Math.atan2(dy, dx);
            particle.x -= Math.cos(angle) * 0.5;
            particle.y -= Math.sin(angle) * 0.5;
          }
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${particleColor}${Math.round(particle.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
      });
      
      animationRef.current = requestAnimationFrame(render);
    };
    
    initParticles(canvas.width, canvas.height);
    render();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [background, maxSize, minSize, particleColor, particleDensity, mousePosition.x, mousePosition.y]);
  
  return (
    <canvas
      ref={canvasRef}
      id={id}
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
} 