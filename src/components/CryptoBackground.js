import React, { useRef, useEffect } from 'react';

const CryptoBackground = ({ 
  className = '',
  opacity = 0.15,
  animationSpeed = 100 
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particles = useRef([]);
  const context = useRef(null);
  const lastUpdateTime = useRef(Date.now());

  // Crypto symbols and price-related symbols
  const cryptoSymbols = [
    '₿', '€', '$', '¥', '£', '₹', '₽', '₩', '₪', '₡',
    '↑', '↓', '→', '←', '↗', '↘', '↖', '↙',
    '▲', '▼', '●', '◆', '■', '♦', '◯', '◇',
    'BTC', 'ETH', 'ADA', 'DOT', 'SOL', 'LINK',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '.', ',', '%', '+', '-'
  ];

  const colors = [
    'rgba(0, 212, 255, 0.3)',
    'rgba(0, 153, 204, 0.3)',
    'rgba(255, 255, 255, 0.2)',
    'rgba(0, 255, 136, 0.3)',
    'rgba(255, 107, 107, 0.3)'
  ];

  const createParticle = (canvasWidth, canvasHeight) => {
    return {
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      symbol: cryptoSymbols[Math.floor(Math.random() * cryptoSymbols.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 16 + 8,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      alpha: Math.random() * 0.5 + 0.1,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.01
    };
  };

  const initializeParticles = (canvasWidth, canvasHeight) => {
    const particleCount = Math.floor((canvasWidth * canvasHeight) / 20000);
    particles.current = Array.from({ length: particleCount }, () => 
      createParticle(canvasWidth, canvasHeight)
    );
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = parent.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    if (context.current) {
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    initializeParticles(rect.width, rect.height);
  };

  const updateParticles = (canvasWidth, canvasHeight, deltaTime) => {
    particles.current.forEach(particle => {
      // Update position
      particle.x += particle.vx * deltaTime;
      particle.y += particle.vy * deltaTime;

      // Update rotation
      particle.rotation += particle.rotationSpeed * deltaTime;

      // Update pulse
      particle.pulsePhase += particle.pulseSpeed * deltaTime;

      // Wrap around edges
      if (particle.x < -50) particle.x = canvasWidth + 50;
      if (particle.x > canvasWidth + 50) particle.x = -50;
      if (particle.y < -50) particle.y = canvasHeight + 50;
      if (particle.y > canvasHeight + 50) particle.y = -50;

      // Update alpha with pulse
      const basePulse = Math.sin(particle.pulsePhase) * 0.2 + 0.8;
      particle.currentAlpha = particle.alpha * basePulse;
    });
  };

  const drawParticles = (canvasWidth, canvasHeight) => {
    if (!context.current) return;
    const ctx = context.current;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    particles.current.forEach(particle => {
      ctx.save();
      
      // Set up transformation
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);
      
      // Set up drawing properties
      ctx.font = `${particle.size}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.globalAlpha = particle.currentAlpha * opacity;
      
      // Draw symbol with gradient effect
      const gradient = ctx.createLinearGradient(-particle.size/2, -particle.size/2, particle.size/2, particle.size/2);
      gradient.addColorStop(0, particle.color);
      gradient.addColorStop(1, particle.color.replace('0.3', '0.1'));
      
      ctx.fillStyle = gradient;
      ctx.fillText(particle.symbol, 0, 0);
      
      ctx.restore();
    });
  };

  const animate = () => {
    const now = Date.now();
    const deltaTime = Math.min(now - lastUpdateTime.current, 100) / 16.67; // Normalize to 60fps
    lastUpdateTime.current = now;

    if (now - lastUpdateTime.current >= animationSpeed || true) {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        updateParticles(rect.width, rect.height, deltaTime);
        drawParticles(rect.width, rect.height);
      }
    }

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    context.current = canvas.getContext('2d');
    resizeCanvas();
    animate();

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [animationSpeed, opacity]);

  const containerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    pointerEvents: 'none',
    zIndex: 1,
  };

  const canvasStyle = {
    display: 'block',
    width: '100%',
    height: '100%',
  };

  return (
    <div style={containerStyle} className={className}>
      <canvas ref={canvasRef} style={canvasStyle} />
    </div>
  );
};

export default CryptoBackground;
