import React, { useState, useCallback, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when clicking on nav links
  const handleNavClick = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Close menu when pressing Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <span className="logo-text">CryptoTracker</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="nav">
          <a href="#home" className="nav-link">Home</a>
          <a href="#markets" className="nav-link">Markets</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-button"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          <span className="menu-icon">
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <nav 
        id="mobile-navigation"
        className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}
        aria-hidden={!isMenuOpen}
      >
        <a href="#home" className="nav-link" onClick={handleNavClick}>Home</a>
        <a href="#markets" className="nav-link" onClick={handleNavClick}>Markets</a>
        <a href="#about" className="nav-link" onClick={handleNavClick}>About</a>
        <a href="#contact" className="nav-link" onClick={handleNavClick}>Contact</a>
      </nav>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div 
          className="mobile-overlay" 
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
};

export default Header;
