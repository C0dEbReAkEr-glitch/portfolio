
import React, { useEffect } from "react";
import Terminal from "../components/Terminal";

const Index = () => {
  useEffect(() => {
    // Set up the particle canvas
    const canvas = document.getElementById('particle-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle properties
    const particles: Particle[] = [];
    const particleCount = 100;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        vx: Math.random() * 0.5 - 0.25,
        vy: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
    
    // Animation function
    const animate = () => {
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Move particles
        p.x += p.vx;
        p.y += p.vy;
        
        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx = -p.vx;
        if (p.y < 0 || p.y > canvas.height) p.vy = -p.vy;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 150, 255, ${p.opacity})`;
        ctx.fill();
        
        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100, 180, 255, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Clean up
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-4">
      {/* Particle canvas for blue network effect */}
      <canvas id="particle-canvas" className="fixed inset-0 z-0 opacity-70"></canvas>
      
      <div className="w-full max-w-5xl h-[80vh] z-10 relative">
        {/* Terminal window with transparent background (removed shadow) */}
        <div className="w-full h-full animate-fade-in rounded-lg overflow-hidden">
          <Terminal />
        </div>
        
        {/* Small label at the bottom */}
        <div className="text-center mt-4 text-xs text-terminal-gray">
          <span className="text-blue-400">©{new Date().getFullYear()} {portfolioData.name}</span>
          <span className="text-terminal-gray mx-2">|</span>
          <span className="text-white"></span>
        </div>
      </div>
    </div>
  );
};

export default Index;

// Add terminal particle type
type Particle = {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  opacity: number;
};

// Add terminal matrix effect that matches the color scheme
const portfolioData = { name: "Khemendra" };
