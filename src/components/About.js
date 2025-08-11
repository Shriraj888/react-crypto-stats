import React from 'react';
import { Shield, TrendingUp, BarChart3, Globe } from 'lucide-react';
import './About.css';

const About = () => {
  const features = [
    {
      icon: <TrendingUp size={28} />,
      title: "Demo Data Simulation",
      description: "Experience realistic cryptocurrency price movements and market trends."
    },
    {
      icon: <Shield size={28} />,
      title: "Secure Demo Environment",
      description: "Safe exploration of crypto analytics without real financial data."
    },
    {
      icon: <BarChart3 size={28} />,
      title: "Advanced Analytics Preview",
      description: "Explore comprehensive market analysis tools and interactive charts."
    },
    {
      icon: <Globe size={28} />,
      title: "Global Market Simulation",
      description: "Experience tracking cryptocurrencies from worldwide exchanges."
    }
  ];

  const stats = [
    { number: "50K+", label: "Demo Users" },
    { number: "20+", label: "Demo Cryptos" },
    { number: "100%", label: "Demo Uptime" },
    { number: "24/7", label: "Demo Access" }
  ];

  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-header">
          <div className="about-badge">
            <Shield size={16} />
            <span>About</span>
          </div>
          <h2>Crypto Analytics Demo Platform</h2>
          <p>Experience professional cryptocurrency market insights with simulated data</p>
        </div>

        <div className="about-content">
          <div className="about-story">
            <div className="story-text">
              <h3>Our Mission</h3>
              <p>
                We democratize cryptocurrency market data by providing professional-grade 
                tracking tools for everyone. Make informed investment decisions with 
                real-time insights and comprehensive analytics.
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
      </div>
    </section>
  );
};

export default About;
