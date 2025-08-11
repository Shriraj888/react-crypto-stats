import React, { useState, useEffect, useRef, memo, useMemo, useCallback } from 'react';
import { TrendingUp, BarChart3, Shield, Play, Star, Rocket, CheckCircle, Users, Clock } from 'lucide-react';
import './Hero.css';

const Hero = memo(({ cryptoData = [] }) => {
  const [animatedStats, setAnimatedStats] = useState({
    totalValue: 0,
    users: 0,
    transactions: 0,
    accuracy: 0
  });
  
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

  // Memoized stats calculation for better performance
  const currentStats = useMemo(() => {
    if (!cryptoData || cryptoData.length === 0) {
      return {
        totalValue: 0,
        topGainer: null,
        marketTrend: 'up',
        totalCoins: 0,
        avgChange: 0
      };
    }

    const totalMarketCap = cryptoData.reduce((sum, crypto) => 
      sum + (crypto.quote?.USD?.market_cap || 0), 0
    );
    
    const topGainer = cryptoData.reduce((prev, current) => 
      (current.quote?.USD?.percent_change_24h || 0) > (prev.quote?.USD?.percent_change_24h || 0) 
        ? current : prev
    );

    const avgChange = cryptoData.reduce((sum, crypto) => 
      sum + (crypto.quote?.USD?.percent_change_24h || 0), 0
    ) / cryptoData.length;

    return {
      totalValue: totalMarketCap,
      topGainer: topGainer,
      marketTrend: avgChange >= 0 ? 'up' : 'down',
      totalCoins: cryptoData.length,
      avgChange: avgChange
    };
  }, [cryptoData]);

  // Optimized scroll functions
  const scrollToMarkets = useCallback(() => {
    document.querySelector('.crypto-section')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const scrollToAbout = useCallback(() => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Optimized intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Unobserve after first trigger
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const currentRef = heroRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Optimized animation function
  useEffect(() => {
    if (!isVisible) return;

    const animateValue = (start, end, duration, callback) => {
      const startTime = performance.now();
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * easeOutCubic;
        callback(current);
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    };

    // Batch state updates for better performance
    const updateStats = (field, value) => {
      setAnimatedStats(prev => ({ ...prev, [field]: value }));
    };

    animateValue(0, currentStats.totalValue, 1500, (value) => updateStats('totalValue', value));
    animateValue(0, 50000, 1800, (value) => updateStats('users', Math.floor(value)));
    animateValue(0, 1000000, 2000, (value) => updateStats('transactions', Math.floor(value)));
    animateValue(0, 99.9, 1500, (value) => updateStats('accuracy', value));
  }, [isVisible, currentStats.totalValue]);

  // Memoized format functions
  const formatValue = useCallback((value) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
    return `$${value.toFixed(0)}`;
  }, []);

  const formatNumber = useCallback((value) => {
    return new Intl.NumberFormat().format(Math.floor(value));
  }, []);

  const formatPercentage = useCallback((value) => {
    return `${value.toFixed(1)}%`;
  }, []);

  return (
    <section className="hero" id="home" ref={heroRef}>
      {/* Simplified background for better performance */}
      <div className="hero-background">
        <div className="floating-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
        </div>
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge animate-slide-in">
            <Star size={16} />
            <span>Professional Crypto Analytics</span>
          </div>
          
          <h1 className="hero-title animate-fade-in-up">
            Master <span className="gradient-text">Cryptocurrency</span> Trading with <span className="highlight-text">Precision</span>
          </h1>
          
          <p className="hero-subtitle animate-fade-in-up">
            Access real-time market data, advanced analytics, and institutional-grade insights for 10,000+ cryptocurrencies.
          </p>

          <div className="hero-stats-grid animate-fade-in-up">
            <div className="stat-card primary">
              <div className="stat-content">
                <span className="stat-number">{formatValue(animatedStats.totalValue)}</span>
                <span className="stat-label">Market Cap</span>
              </div>
            </div>

            <div className="stat-card secondary">
              <div className="stat-content">
                <span className="stat-number">{formatNumber(animatedStats.users)}</span>
                <span className="stat-label">Active Users</span>
              </div>
            </div>

            <div className="stat-card accent">
              <div className="stat-content">
                <span className="stat-number">{formatPercentage(animatedStats.accuracy)}</span>
                <span className="stat-label">Accuracy</span>
              </div>
            </div>
          </div>
          
          <div className="hero-buttons animate-fade-in-up">
            <button className="modern-button primary-gradient" onClick={scrollToMarkets}>
              <Rocket size={18} />
              Start Analytics
            </button>
            <button className="modern-button glass-effect" onClick={scrollToAbout}>
              <Play size={18} />
              View Demo
            </button>
          </div>

          <div className="trust-section animate-fade-in-up">
            <div className="trust-item">
              <CheckCircle size={16} />
              <span>99.9% Uptime</span>
            </div>
            <div className="trust-item">
              <Users size={16} />
              <span>50K+ Traders</span>
            </div>
            <div className="trust-item">
              <Clock size={16} />
              <span>Real-Time Data</span>
            </div>
          </div>
        </div>

        <div className="hero-features">
          <div className="feature-card premium animate-slide-in-right">
            <div className="feature-header">
              <TrendingUp size={24} />
              <span className="feature-badge">Live</span>
            </div>
            <h3>Real-Time Analytics</h3>
            <p>Monitor live market movements with institutional-grade data feeds.</p>
          </div>
          
          <div className="feature-card premium animate-slide-in-right">
            <div className="feature-header">
              <BarChart3 size={24} />
              <span className="feature-badge">Pro</span>
            </div>
            <h3>Advanced Charting</h3>
            <p>Professional trading tools with 100+ technical indicators.</p>
          </div>
          
          <div className="feature-card premium animate-slide-in-right">
            <div className="feature-header">
              <Shield size={24} />
              <span className="feature-badge">Secure</span>
            </div>
            <h3>Enterprise Security</h3>
            <p>Bank-grade security with end-to-end encryption protection.</p>
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
