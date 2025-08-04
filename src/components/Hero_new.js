import React, { useState, useEffect } from 'react';
import { TrendingUp, BarChart3, Shield, Play, ArrowRight, Star, Users, Activity, Zap, Globe, DollarSign } from 'lucide-react';
import './Hero.css';

const Hero = ({ cryptoData = [] }) => {
  const [currentStats, setCurrentStats] = useState({
    totalValue: 0,
    topGainer: null,
    marketTrend: 'up'
  });

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
        marketTrend: avgChange >= 0 ? 'up' : 'down'
      });
    }
  }, [cryptoData]);

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

  return (
    <section className="hero" id="home">
      {/* Background decorative elements */}
      <div className="hero-background">
        <div className="geometric-decoration star-decoration" style={{ top: '15%', right: '15%' }}></div>
        <div className="geometric-decoration diamond-decoration" style={{ bottom: '25%', left: '10%' }}></div>
        <div className="geometric-decoration star-decoration" style={{ top: '60%', right: '8%' }}></div>
        <div className="geometric-decoration diamond-decoration" style={{ top: '30%', left: '5%' }}></div>
      </div>

      <div className="hero-container">
        {/* Left Content */}
        <div className="hero-content">
          <div className="hero-badge">
            <Star size={16} />
            <span>Real-Time Crypto Analytics</span>
          </div>
          
          <h1 className="hero-title">
            Track <span className="gradient-text">Cryptocurrency</span> Market Like a Pro
          </h1>
          
          <p className="hero-subtitle">
            Get real-time data, advanced analytics, and professional insights for over 10,000+ cryptocurrencies. 
            Make informed decisions with our comprehensive market analysis tools.
          </p>

          {/* Live Market Stats */}
          <div className="hero-stats">
            <div className="stat-item">
              <DollarSign size={20} />
              <div>
                <span className="stat-value">{formatValue(currentStats.totalValue)}</span>
                <span className="stat-label">Total Market Cap</span>
              </div>
            </div>
            <div className="stat-item">
              <TrendingUp size={20} />
              <div>
                <span className="stat-value">
                  {currentStats.topGainer?.symbol || 'BTC'}
                </span>
                <span className="stat-label">Top Gainer</span>
              </div>
            </div>
            <div className="stat-item">
              <Activity size={20} />
              <div>
                <span className={`stat-value ${currentStats.marketTrend === 'up' ? 'positive' : 'negative'}`}>
                  {currentStats.marketTrend === 'up' ? '↗' : '↘'} Market
                </span>
                <span className="stat-label">Trend</span>
              </div>
            </div>
          </div>
          
          <div className="hero-buttons">
            <button className="modern-button" onClick={scrollToMarkets}>
              <Play size={18} />
              Start Tracking
            </button>
            <button className="modern-button secondary" onClick={scrollToAbout}>
              Learn More
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="trust-indicators">
            <div className="trust-item">
              <Users size={20} />
              <span>10K+ Active Users</span>
            </div>
            <div className="trust-item">
              <Shield size={20} />
              <span>Bank-Level Security</span>
            </div>
            <div className="trust-item">
              <Globe size={20} />
              <span>Global Coverage</span>
            </div>
          </div>
        </div>

        {/* Right Content - Feature Cards */}
        <div className="hero-features">
          <div className="feature-card animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="feature-icon">
              <TrendingUp size={32} />
            </div>
            <h3>Real-Time Tracking</h3>
            <p>Monitor live price movements and market trends with millisecond precision.</p>
          </div>
          
          <div className="feature-card animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="feature-icon">
              <BarChart3 size={32} />
            </div>
            <h3>Advanced Analytics</h3>
            <p>Professional charts and indicators for technical analysis and trading decisions.</p>
          </div>
          
          <div className="feature-card animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="feature-icon">
              <Zap size={32} />
            </div>
            <h3>Lightning Fast</h3>
            <p>Optimized performance with instant data updates and seamless user experience.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
