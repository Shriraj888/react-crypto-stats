import React from 'react';
import { Shield, TrendingUp, Users, Award, BarChart3, Globe } from 'lucide-react';
import GridMotion from './GridMotion';
import './About.css';

const About = ({ cryptoData = [] }) => {
  const features = [
    {
      icon: <TrendingUp size={32} />,
      title: "Real-Time Data",
      description: "Get live cryptocurrency prices and market data updated every second from reliable sources."
    },
    {
      icon: <Shield size={32} />,
      title: "Secure Platform",
      description: "Bank-level security with encrypted data transmission and secure API connections."
    },
    {
      icon: <BarChart3 size={32} />,
      title: "Advanced Analytics",
      description: "Comprehensive market analysis tools with detailed charts and performance metrics."
    },
    {
      icon: <Users size={32} />,
      title: "Community Driven",
      description: "Join thousands of crypto enthusiasts sharing insights and market predictions."
    },
    {
      icon: <Award size={32} />,
      title: "Award Winning",
      description: "Recognized as one of the best crypto tracking platforms by industry experts."
    },
    {
      icon: <Globe size={32} />,
      title: "Global Coverage",
      description: "Track cryptocurrencies from exchanges worldwide with multi-currency support."
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "500+", label: "Cryptocurrencies" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" }
  ];

  // Create dynamic crypto items from real API data
  const createCryptoItems = () => {
    if (cryptoData && cryptoData.length > 0) {
      return cryptoData.slice(0, 28).map((crypto, index) => ({
        type: 'crypto',
        symbol: crypto.symbol,
        name: crypto.name,
        price: crypto.quote?.USD?.price || 0,
        change: crypto.quote?.USD?.percent_change_24h || 0,
        image: crypto.image,
        rank: crypto.cmc_rank,
        current_price: crypto.quote?.USD?.price || 0,
        price_change_percentage_24h: crypto.quote?.USD?.percent_change_24h || 0
      }));
    }
    
    // Fallback crypto items if no data
    return [
      "₿", "Ξ", "₳", "⚡", "🌕", "📈", "💎", 
      "BTC", "ETH", "ADA", "SOL", "DOGE", "DOT", "LINK",
      "🚀", "💰", "📊", "⭐", "🔥", "💸", "🎯",
      "XRP", "LTC", "BCH", "UNI", "MATIC", "AVAX", "ATOM"
    ];
  };

  const cryptoItems = createCryptoItems();

  return (
    <section className="about-section" id="about">
      {/* GridMotion Background */}
      <div className="about-grid-motion">
        <GridMotion 
          items={cryptoItems} 
          gradientColor="rgba(0, 212, 255, 0.1)" 
        />
      </div>
      
      <div className="about-container">
        <div className="about-header">
          <h2>About CryptoTracker</h2>
          <p>Your trusted partner in cryptocurrency tracking and portfolio management</p>
        </div>

        <div className="about-content">
          <div className="about-story">
            <div className="story-text">
              <h3>Our Mission</h3>
              <p>
                At CryptoTracker, we believe that everyone should have access to professional-grade 
                cryptocurrency tracking tools. Our mission is to democratize crypto market data and 
                provide users with the insights they need to make informed investment decisions.
              </p>
              <p>
                Founded by a team of blockchain enthusiasts and financial experts, we've built a 
                platform that combines cutting-edge technology with user-friendly design to deliver 
                the ultimate crypto tracking experience.
              </p>
            </div>
            <div className="story-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="about-cta">
          <h3>Ready to Start Tracking?</h3>
          <p>Join thousands of users who trust CryptoTracker for their crypto portfolio management</p>
          <button className="modern-button">
            <TrendingUp size={20} />
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
