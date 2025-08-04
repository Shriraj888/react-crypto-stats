import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, BarChart3, Shield, Play, ArrowRight, Star, Activity, Zap, Globe, DollarSign, Sparkles, Target, Award, Rocket, CheckCircle, Users, Clock } from 'lucide-react';
import './Hero.css';

const Hero = ({ cryptoData = [] }) => {
  const [currentStats, setCurrentStats] = useState({
    totalValue: 0,
    topGainer: null,
    marketTrend: 'up',
    totalCoins: 0,
    avgChange: 0
  });
  
  const [animatedStats, setAnimatedStats] = useState({
    totalValue: 0,
    users: 0,
    transactions: 0,
    accuracy: 0
  });
  
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

  // Calculate live stats from crypto data
  useEffect(() => {
    if (cryptoData && cryptoData.length > 0) {
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

      setCurrentStats({
        totalValue: totalMarketCap,
        topGainer: topGainer,
        marketTrend: avgChange >= 0 ? 'up' : 'down',
        totalCoins: cryptoData.length,
        avgChange: avgChange
      });
    }
  }, [cryptoData]);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
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

  // Animated counters
  useEffect(() => {
    if (isVisible) {
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

      // Animate stats
      animateValue(0, currentStats.totalValue, 2000, (value) => {
        setAnimatedStats(prev => ({ ...prev, totalValue: value }));
      });
      
      animateValue(0, 50000, 2500, (value) => {
        setAnimatedStats(prev => ({ ...prev, users: Math.floor(value) }));
      });
      
      animateValue(0, 1000000, 3000, (value) => {
        setAnimatedStats(prev => ({ ...prev, transactions: Math.floor(value) }));
      });
      
      animateValue(0, 99.9, 2000, (value) => {
        setAnimatedStats(prev => ({ ...prev, accuracy: value }));
      });
    }
  }, [isVisible, currentStats.totalValue]);

  // Scroll to sections
  const scrollToMarkets = () => {
    document.querySelector('.crypto-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Format large numbers
  const formatValue = (value) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
    return `$${value.toFixed(0)}`;
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat().format(Math.floor(value));
  };

  const formatPercentage = (value) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <section className="hero" id="home" ref={heroRef}>
      {/* Advanced Background with floating elements */}
      <div className="hero-background">
        <div className="floating-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
          <div className="orb orb-4"></div>
        </div>
        <div className="geometric-decoration star-decoration animate-float" style={{ top: '15%', right: '15%' }}></div>
        <div className="geometric-decoration diamond-decoration animate-float-delayed" style={{ bottom: '25%', left: '10%' }}></div>
        <div className="geometric-decoration star-decoration animate-float" style={{ top: '60%', right: '8%' }}></div>
        <div className="geometric-decoration diamond-decoration animate-float-delayed" style={{ top: '30%', left: '5%' }}></div>
      </div>

      <div className="hero-container">
        {/* Left Content */}
        <div className="hero-content">
          <div className="hero-badge animate-slide-in">
            <Star size={16} />
            <span>Professional Crypto Analytics</span>
            <div className="badge-pulse"></div>
          </div>
          
          <h1 className="hero-title animate-fade-in-up">
            Master <span className="gradient-text animate-gradient">Cryptocurrency</span> Trading with <span className="highlight-text">Precision</span>
          </h1>
          
          <p className="hero-subtitle animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Access real-time market data, advanced analytics, and institutional-grade insights for 10,000+ cryptocurrencies. 
            Make data-driven decisions with our cutting-edge analysis platform.
          </p>

          {/* Advanced Stats Grid */}
          <div className="hero-stats-grid animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="stat-card primary">
              <div className="stat-icon">
                <DollarSign size={24} />
              </div>
              <div className="stat-content">
                <span className="stat-number">{formatValue(animatedStats.totalValue)}</span>
                <span className="stat-label">Total Market Cap</span>
                <div className="stat-trend positive">
                  <TrendingUp size={14} />
                  <span>+2.4%</span>
                </div>
              </div>
            </div>

            <div className="stat-card secondary">
              <div className="stat-icon">
                <Activity size={24} />
              </div>
              <div className="stat-content">
                <span className="stat-number">{formatNumber(animatedStats.users)}</span>
                <span className="stat-label">Active Traders</span>
                <div className="stat-trend positive">
                  <TrendingUp size={14} />
                  <span>Live</span>
                </div>
              </div>
            </div>

            <div className="stat-card accent">
              <div className="stat-icon">
                <BarChart3 size={24} />
              </div>
              <div className="stat-content">
                <span className="stat-number">{formatNumber(animatedStats.transactions)}</span>
                <span className="stat-label">Daily Transactions</span>
                <div className="stat-trend positive">
                  <TrendingUp size={14} />
                  <span>24h</span>
                </div>
              </div>
            </div>

            <div className="stat-card success">
              <div className="stat-icon">
                <Target size={24} />
              </div>
              <div className="stat-content">
                <span className="stat-number">{formatPercentage(animatedStats.accuracy)}</span>
                <span className="stat-label">Accuracy Rate</span>
                <div className="stat-trend positive">
                  <Award size={14} />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="hero-buttons animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button className="modern-button primary-gradient" onClick={scrollToMarkets}>
              <Rocket size={18} />
              Start Analytics
              <div className="button-shine"></div>
            </button>
            <button className="modern-button glass-effect" onClick={scrollToAbout}>
              <Play size={18} />
              View Demo
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Enhanced Trust Indicators */}
          <div className="trust-section animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="trust-item">
              <div className="trust-icon">
                <CheckCircle size={18} />
              </div>
              <div className="trust-content">
                <span className="trust-title">99.9% Uptime</span>
                <span className="trust-subtitle">Enterprise Grade</span>
              </div>
            </div>
            <div className="trust-item">
              <div className="trust-icon">
                <Users size={18} />
              </div>
              <div className="trust-content">
                <span className="trust-title">50K+ Traders</span>
                <span className="trust-subtitle">Active Community</span>
              </div>
            </div>
            <div className="trust-item">
              <div className="trust-icon">
                <Clock size={18} />
              </div>
              <div className="trust-content">
                <span className="trust-title">Real-Time Data</span>
                <span className="trust-subtitle">Live Updates</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Enhanced Feature Cards */}
        <div className="hero-features">
          <div className="feature-card premium animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
            <div className="feature-header">
              <div className="feature-icon gradient-bg">
                <TrendingUp size={28} />
              </div>
              <div className="feature-badge">Live</div>
            </div>
            <h3>Real-Time Analytics</h3>
            <p>Monitor live market movements with institutional-grade data feeds and millisecond precision updates.</p>
            <div className="feature-stats">
              <div className="mini-stat">
                <span>99.9%</span>
                <span>Accuracy</span>
              </div>
              <div className="mini-stat">
                <span>&lt;50ms</span>
                <span>Latency</span>
              </div>
            </div>
          </div>
          
          <div className="feature-card premium animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
            <div className="feature-header">
              <div className="feature-icon gradient-bg">
                <BarChart3 size={28} />
              </div>
              <div className="feature-badge">Pro</div>
            </div>
            <h3>Advanced Charting</h3>
            <p>Professional trading tools with 100+ technical indicators and customizable chart layouts.</p>
            <div className="feature-stats">
              <div className="mini-stat">
                <span>100+</span>
                <span>Indicators</span>
              </div>
              <div className="mini-stat">
                <span>Pro</span>
                <span>Tools</span>
              </div>
            </div>
          </div>
          
          <div className="feature-card premium animate-slide-in-right" style={{ animationDelay: '0.6s' }}>
            <div className="feature-header">
              <div className="feature-icon gradient-bg">
                <Shield size={28} />
              </div>
              <div className="feature-badge">Secure</div>
            </div>
            <h3>Enterprise Security</h3>
            <p>Bank-grade security with end-to-end encryption and multi-factor authentication protection.</p>
            <div className="feature-stats">
              <div className="mini-stat">
                <span>256-bit</span>
                <span>Encryption</span>
              </div>
              <div className="mini-stat">
                <span>24/7</span>
                <span>Monitor</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Elements */}
      <div className="floating-elements">
        <div className="floating-cta animate-bounce">
          <button className="pulse-button">
            <TrendingUp size={20} />
          </button>
          <span>Live Market</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
