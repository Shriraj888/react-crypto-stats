import React, { useState, useEffect } from 'react';
import { Github, Twitter, Linkedin, Mail, ArrowUp, Send } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Handle back to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle newsletter subscription
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send the email to your backend
      alert('Thank you for subscribing to our newsletter!');
      setEmail('');
    }
  };

  // Handle back to top click
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            {/* Footer Brand */}
            <div className="footer-brand">
              <a href="#home" className="footer-logo">CryptoWeb</a>
              <p className="footer-description">
                Your trusted platform for real-time cryptocurrency tracking, market analysis, and trading insights. Stay ahead of the crypto revolution.
              </p>
              <div className="footer-social">
                <a href="https://github.com" className="footer-social-link" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github size={18} />
                </a>
                <a href="https://twitter.com" className="footer-social-link" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter size={18} />
                </a>
                <a href="https://linkedin.com" className="footer-social-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin size={18} />
                </a>
                <a href="mailto:support@cryptoweb.com" className="footer-social-link" aria-label="Email">
                  <Mail size={18} />
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="footer-section">
              <h4>Platform</h4>
              <ul className="footer-links">
                <li><a href="#home" className="footer-link">Home</a></li>
                <li><a href="#markets" className="footer-link">Markets</a></li>
                <li><a href="#portfolio" className="footer-link">Portfolio</a></li>
                <li><a href="#trading" className="footer-link">Trading</a></li>
                <li><a href="#analytics" className="footer-link">Analytics</a></li>
              </ul>
            </div>
            
            {/* Resources */}
            <div className="footer-section">
              <h4>Resources</h4>
              <ul className="footer-links">
                <li><a href="#api" className="footer-link">API Documentation</a></li>
                <li><a href="#help" className="footer-link">Help Center</a></li>
                <li><a href="#learn" className="footer-link">Learn Crypto</a></li>
                <li><a href="#about" className="footer-link">About Us</a></li>
                <li><a href="#blog" className="footer-link">Blog</a></li>
              </ul>
            </div>
            
            {/* Newsletter */}
            <div className="newsletter">
              <h4>Stay Updated</h4>
              <p>Get the latest crypto news, market insights, and exclusive updates delivered to your inbox.</p>
              <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  className="newsletter-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="newsletter-button">
                  <Send size={16} style={{ marginRight: '8px' }} />
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          
          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="footer-copyright">
              &copy; 2025 CryptoWeb. All rights reserved.
            </div>
            <ul className="footer-bottom-links">
              <li><a href="#privacy" className="footer-bottom-link">Privacy Policy</a></li>
              <li><a href="#terms" className="footer-bottom-link">Terms of Service</a></li>
              <li><a href="#cookies" className="footer-bottom-link">Cookie Policy</a></li>
              <li><a href="#contact" className="footer-bottom-link">Contact</a></li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>
    </>
  );
};

export default Footer;
