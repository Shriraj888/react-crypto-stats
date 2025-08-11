import React, { useState, useCallback, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollY, setLastScrollY] = useState(0);

  // Smooth scroll function for navigation links
  const smoothScrollTo = useCallback((elementId) => {
    const element = document.querySelector(elementId);
    if (element) {
      const headerHeight = 80; // Account for fixed header
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  // Enhanced nav click handler with smooth scroll
  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    // Add small delay for mobile menu close animation
    setTimeout(() => {
      smoothScrollTo(href);
    }, isMenuOpen ? 150 : 0);
  }, [isMenuOpen, smoothScrollTo]);

  // Scroll direction and position tracking
  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      const scrollY = window.scrollY;
      
      // Update scroll position state
      setIsScrolled(scrollY > 50);
      
      // Update scroll direction
      if (Math.abs(scrollY - lastScrollY) > 5) {
        setScrollDirection(scrollY > lastScrollY ? 'down' : 'up');
        setLastScrollY(scrollY);
      }
      
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close menu when clicking on nav links
  const handleMobileNavClick = useCallback((e, href) => {
    handleNavClick(e, href);
  }, [handleNavClick]);

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

  // Prevent body scroll when menu is open with enhanced scroll lock
  useEffect(() => {
    if (isMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isMenuOpen]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''} ${scrollDirection === 'down' ? 'hide' : 'show'}`}>
      <div className="header-container">
        <div className="logo">
          <span className="logo-text">CryptoTracker</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="nav">
          <a href="#home" className="nav-link" onClick={(e) => handleNavClick(e, '#home')}>Home</a>
          <a href="#markets" className="nav-link" onClick={(e) => handleNavClick(e, '#markets')}>Markets</a>
          <a href="#about" className="nav-link" onClick={(e) => handleNavClick(e, '#about')}>About</a>
          <a href="#contact" className="nav-link" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a>
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
        <a href="#home" className="nav-link" onClick={(e) => handleMobileNavClick(e, '#home')}>Home</a>
        <a href="#markets" className="nav-link" onClick={(e) => handleMobileNavClick(e, '#markets')}>Markets</a>
        <a href="#about" className="nav-link" onClick={(e) => handleMobileNavClick(e, '#about')}>About</a>
        <a href="#contact" className="nav-link" onClick={(e) => handleMobileNavClick(e, '#contact')}>Contact</a>
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
