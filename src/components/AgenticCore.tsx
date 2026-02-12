import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const AgenticCore = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const num = 120; 
    const container = svgRef.current.querySelector('.dot-container');
    const colors = ['#00ff88', '#ffcc00', '#ffffff', '#e0fff4'];
    const dots: SVGCircleElement[] = [];

    if (container) container.innerHTML = '';

    for (let i = 0; i < num; i++) {
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      // Mix of sizes for depth
      const size = i % 10 === 0 ? Math.random() * 3 + 2 : Math.random() * 1.5 + 0.5;
      dot.setAttribute('r', size.toString());
      dot.setAttribute('fill', colors[i % colors.length]);
      container?.appendChild(dot);
      dots.push(dot);

      gsap.set(dot, {
        x: Math.random() * 400,
        y: Math.random() * 400,
        opacity: 0,
        transformOrigin: "50% 50%"
      });
    }

    dots.forEach((dot, i) => {
      // Main Vortex/Orbital movement
      gsap.to(dot, {
        duration: 15 + Math.random() * 15,
        rotation: 360,
        repeat: -1,
        ease: "none",
        transformOrigin: "200px 200px"
      });

      // Shifting position
      gsap.to(dot, {
        duration: 5 + Math.random() * 5,
        x: "+=" + (Math.random() * 100 - 50),
        y: "+=" + (Math.random() * 100 - 50),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // THE SPARKLE: Rapid Twinkle
      gsap.to(dot, {
        duration: 0.2 + Math.random() * 0.8,
        opacity: Math.random() * 0.5 + 0.5,
        scale: i % 5 === 0 ? 1.8 : 1.2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: Math.random() * 2
      });
    });

  }, []);

  return (
    <div style={{ 
      position: 'absolute', 
      inset: 0, 
      zIndex: 0, 
      opacity: 1, 
      pointerEvents: 'none',
      overflow: 'hidden',
      WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 80%)',
      maskImage: 'radial-gradient(circle, black 40%, transparent 80%)'
    }}>
      <svg 
        ref={svgRef} 
        viewBox="0 0 400 400" 
        style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 0 8px rgba(0,255,136,0.4))' }}
      >
        <defs>
          <filter id="glow-sparkle" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g className="dot-container" filter="url(#glow-sparkle)" />
      </svg>
    </div>
  );
};

export default AgenticCore;
