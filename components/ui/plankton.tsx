"use client";

import React, { useRef, useEffect } from "react";

interface PlanktonCoreProps {
  id: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
  interactionRadius?: number;
  repulsionStrength?: number;
}

export const PlanktonCore = ({
  id,
  background = "transparent",
  minSize = 0.4,
  maxSize = 1.5,
  particleDensity = 100,
  className,
  particleColor = "#88CCFF",
  interactionRadius = 150,
  repulsionStrength = 1.2
}: PlanktonCoreProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Array<Plankton>>([]);
  const animationRef = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  const timeRef = useRef<number>(0);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Main animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const updateCanvasSize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    
    updateCanvasSize();

    // Initialize particles
    const initParticles = () => {
      particles.current = [];
      const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 10000) * particleDensity, 500);
      
      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * (maxSize - minSize) + minSize,
          speedX: Math.random() * 0.3 - 0.15,
          speedY: Math.random() * 0.3 - 0.15,
          opacity: Math.random() * 0.5 + 0.5,
          wobbleSpeed: Math.random() * 0.02 + 0.01,
          wobbleAmount: Math.random() * 0.5 + 0.5,
          wobbleOffset: Math.random() * Math.PI * 2,
          hue: Math.random() * 40 - 20,
          // Add properties for natural movement
          flowOffset: Math.random() * Math.PI * 2,
          flowSpeed: Math.random() * 0.01 + 0.005,
          flowStrength: Math.random() * 0.3 + 0.1,
          // Add direction change properties
          directionChangeTime: Math.random() * 5000 + 3000,
          lastDirectionChange: 0,
        });
      }
    };

    // Create flow field effect
    const getFlowDirection = (x: number, y: number, time: number) => {
      // Perlin-like noise simulation for flow field
      const scale = 0.005;
      const angle = Math.sin(x * scale) * Math.cos(y * scale) * Math.PI * 2 + time * 0.15;
      return {
        x: Math.cos(angle) * 0.2,
        y: Math.sin(angle) * 0.2
      };
    };

    // Animation loop
    const animate = (timestamp: number) => {
      if (!canvas || !ctx) return;
      
      // Update time
      timeRef.current += 0.01;
      const time = timeRef.current;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Get mouse position
      const { x: mouseX, y: mouseY } = mouseRef.current;
      
      // Update and draw particles
      particles.current.forEach((particle, i) => {
        // Natural wobble movement
        const wobble = Math.sin(time * 1000 * particle.wobbleSpeed + particle.wobbleOffset) * particle.wobbleAmount;
        
        // Flow field movement when mouse is not interacting
        const flow = getFlowDirection(particle.x, particle.y, time);
        
        // Check if it's time to change direction
        const now = timestamp;
        if (now - particle.lastDirectionChange > particle.directionChangeTime) {
          particle.speedX = Math.random() * 0.4 - 0.2;
          particle.speedY = Math.random() * 0.4 - 0.2;
          particle.lastDirectionChange = now;
        }
        
        // Apply flow field when mouse is far away
        let mouseInfluence = false;
        if (mouseX !== null && mouseY !== null) {
          const dx = mouseX - particle.x;
          const dy = mouseY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < interactionRadius) {
            mouseInfluence = true;
            // Repulsion effect
            const repulsionFactor = (1 - distance / interactionRadius) * repulsionStrength;
            const angle = Math.atan2(dy, dx);
            
            // Move away from mouse
            particle.x -= Math.cos(angle) * repulsionFactor;
            particle.y -= Math.sin(angle) * repulsionFactor;
            
            // Add some turbulence
            particle.speedX += (Math.random() - 0.5) * 0.2;
            particle.speedY += (Math.random() - 0.5) * 0.2;
          }
        }
        
        // If no mouse influence, apply flow field
        if (!mouseInfluence) {
          particle.x += flow.x * particle.flowStrength;
          particle.y += flow.y * particle.flowStrength;
          
          // Add some natural drift
          const sinOffset = Math.sin(time + particle.flowOffset) * 0.3;
          const cosOffset = Math.cos(time * 0.7 + particle.flowOffset) * 0.3;
          
          particle.x += sinOffset * 0.1;
          particle.y += cosOffset * 0.1;
        }
        
        // Base movement always applies
        particle.x += particle.speedX + wobble * 0.05;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Dampen speed over time
        particle.speedX *= 0.98;
        particle.speedY *= 0.98;
        
        // Draw particle
        ctx.beginPath();
        
        // Different shapes for variety
        if (i % 3 === 0) {
          // Oval shape
          ctx.ellipse(
            particle.x, 
            particle.y, 
            particle.size * 1.5, 
            particle.size * 0.8, 
            Math.atan2(particle.speedY, particle.speedX), 
            0, 
            Math.PI * 2
          );
        } else {
          // Circle
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        }
        
        // Color with variation
        const baseColor = particleColor.startsWith('#') ? particleColor.substring(1) : particleColor;
        let r = parseInt(baseColor.substring(0, 2), 16);
        let g = parseInt(baseColor.substring(2, 4), 16);
        let b = parseInt(baseColor.substring(4, 6), 16);
        
        r = Math.max(0, Math.min(255, r + Math.round(particle.hue)));
        g = Math.max(0, Math.min(255, g + Math.round(particle.hue)));
        b = Math.max(0, Math.min(255, b + Math.round(particle.hue)));
        
        const colorHex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        ctx.fillStyle = `${colorHex}${Math.round(particle.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
      });
      
      // Continue animation
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Handle window resize
    const handleResize = () => {
      updateCanvasSize();
      initParticles();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Initialize and start animation
    initParticles();
    animationRef.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [background, maxSize, minSize, particleColor, particleDensity, interactionRadius, repulsionStrength]);
  
  return (
    <canvas
      ref={canvasRef}
      id={id}
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

interface Plankton {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  wobbleSpeed: number;
  wobbleAmount: number;
  wobbleOffset: number;
  hue: number;
  // Flow field properties
  flowOffset: number;
  flowSpeed: number;
  flowStrength: number;
  // Direction change properties
  directionChangeTime: number;
  lastDirectionChange: number;
} 