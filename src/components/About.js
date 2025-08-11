import React from 'react';
import { Shield, TrendingUp, BarChart3, Globe } from 'lucide-react';
import './About.css';

const About = () => {
  const features = [
    {
      icon: <TrendingUp size={28} />,
      title: "Real-Time Data",
      description: "Live cryptocurrency prices updated every second."
    },
    {
      icon: <Shield size={28} />,
      title: "Secure Platform",
      description: "Bank-level security with encrypted connections."
    },
    {
      icon: <BarChart3 size={28} />,
      title: "Advanced Analytics",
      description: "Comprehensive market analysis and charts."
    },
    {
      icon: <Globe size={28} />,
      title: "Global Coverage",
      description: "Track cryptocurrencies from worldwide exchanges."
    }
  ];

  const stats = [
    { number: "10K+", label: "Users" },
    { number: "500+", label: "Cryptos" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-header">
          <div className="about-badge">
            <Shield size={16} />
            <span>About</span>
          </div>
          <h2>Professional Crypto Tracking</h2>
          <p>Your trusted platform for cryptocurrency market insights</p>
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
