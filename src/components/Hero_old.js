import React, { useState, useEffect } from 'react';
import { TrendingUp, BarChart3, Shield, Play, ArrowRight, Star, Users, Activity, Zap, Globe, DollarSign } from 'lucide-react';
import './Hero.css';

const Hero = ({ cryptoData = [] }) => {
  const [currentStats, setCurrentStats] = useState({
    totalValue: 0,
    topGainer: null,
    marketTrend: 'up'
  });
        const speed = parseFloat(element.dataset.speed) || 0.5;
        const yPos = -(scrollY * speed);
        
        // Add mouse-following effect for some elements
        if (element.classList.contains('floating-orb')) {
          const mouseX = (mousePosition.x - 0.5) * 50;
          const mouseY = (mousePosition.y - 0.5) * 50;
          element.style.transform = `translate3d(${mouseX}px, ${yPos + mouseY}px, 0)`;
        } else {
          element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        }
      });
    }
  }, [scrollY, mousePosition]);

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
        topGainer,
        marketTrend: avgChange > 0 ? 'up' : 'down'
      });
    }
  }, [cryptoData]);

  const formatMarketCap = (value) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
    return `$${value.toFixed(0)}`;
  };

  const scrollToMarkets = () => {
    document.getElementById('markets')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <section className="hero" id="home" ref={heroRef}>
      {/* Geometric Decorative Elements */}
      <div className="geometric-decoration star-decoration" style={{ top: '15%', right: '15%' }}></div>
      <div className="geometric-decoration diamond-decoration" style={{ bottom: '25%', left: '10%' }}></div>
      <div className="geometric-decoration star-decoration" style={{ top: '60%', right: '8%' }}></div>
      <div className="geometric-decoration diamond-decoration" style={{ top: '30%', left: '5%' }}></div>
      
      {/* Parallax Background Elements */}
      <div className="parallax-container" ref={parallaxRef}>
        <div className="parallax-element crypto-symbol btc" data-speed="0.2">₿</div>
        <div className="parallax-element crypto-symbol eth" data-speed="0.3">Ξ</div>
        <div className="parallax-element crypto-symbol ada" data-speed="0.15">₳</div>
        <div className="parallax-element crypto-symbol dot" data-speed="0.25">●</div>
        
        <div className="parallax-element floating-orb orb-1" data-speed="0.4"></div>
        <div className="parallax-element floating-orb orb-2" data-speed="0.6"></div>
        <div className="parallax-element floating-orb orb-3" data-speed="0.3"></div>
        
        <div className="parallax-element grid-pattern" data-speed="0.1"></div>
        <div className="parallax-element gradient-blob blob-1" data-speed="0.5"></div>
        <div className="parallax-element gradient-blob blob-2" data-speed="0.35"></div>
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <Star size={16} />
            <span>Trusted by 10,000+ traders worldwide</span>
          </div>
          
          <h1 className="hero-title">
            Master Your <span className="gradient-text">Crypto</span> Journey
          </h1>
          
          <p className="hero-subtitle">
            Professional-grade cryptocurrency tracking with real-time data, 
            advanced analytics, and portfolio insights. Make informed decisions 
            with the tools trusted by successful traders.
          </p>

          {/* Live Market Stats */}
          {cryptoData.length > 0 && (
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-label">Market Cap</div>
                <div className="stat-value">
                  {formatMarketCap(currentStats.totalValue)}
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Top Gainer</div>
                <div className="stat-value trending-up">
                  {currentStats.topGainer?.symbol || 'Loading...'}
                  {currentStats.topGainer && (
                    <span className="percentage">
                      +{currentStats.topGainer.quote.USD.percent_change_24h.toFixed(1)}%
                    </span>
                  )}
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Market Trend</div>
                <div className={`stat-value trend-${currentStats.marketTrend}`}>
                  <Activity size={16} />
                  {currentStats.marketTrend === 'up' ? 'Bullish' : 'Bearish'}
                </div>
              </div>
            </div>
          )}
          
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
              <Activity size={20} />
              <span>Real-Time Data</span>
            </div>
          </div>
        </div>
        
        <div className="hero-features">
          <div className="feature-card premium parallax-card" data-tilt>
            <div className="feature-header">
              <TrendingUp className="feature-icon" size={28} />
              <div className="feature-badge">Live</div>
            </div>
            <h3>Real-time Market Data</h3>
            <p>Get instant updates on prices, trends, and market movements from top exchanges worldwide.</p>
            <div className="feature-stats">
              <span>500+ Cryptocurrencies</span>
            </div>
          </div>
          
          <div className="feature-card parallax-card" data-tilt>
            <div className="feature-header">
              <BarChart3 className="feature-icon" size={28} />
            </div>
            <h3>Advanced Analytics</h3>
            <p>Professional trading tools with detailed charts, technical indicators, and market insights.</p>
            <div className="feature-stats">
              <span>15+ Technical Indicators</span>
            </div>
          </div>
          
          <div className="feature-card parallax-card" data-tilt>
            <div className="feature-header">
              <Shield className="feature-icon" size={28} />
            </div>
            <h3>Secure & Reliable</h3>
            <p>Enterprise-grade security with 99.9% uptime and encrypted data protection.</p>
            <div className="feature-stats">
              <span>99.9% Uptime</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hero-bg">
        <LetterGlitch
          glitchSpeed={120}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
        />
      </div>
    </section>
  );
};

export default Hero;
