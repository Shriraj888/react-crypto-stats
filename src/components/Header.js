import React, { useState, useCallback, useEffect, memo } from 'react';
import { Menu, X } from 'lucide-react';
import './Header.css';

const Header = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollY, setLastScrollY] = useState(0);

  // Optimized smooth scroll function
  const smoothScrollTo = useCallback((elementId) => {
    const element = document.querySelector(elementId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  // Optimized nav click handler
  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    // Reduced delay for better performance
    setTimeout(() => {
      smoothScrollTo(href);
    }, isMenuOpen ? 100 : 0);
  }, [isMenuOpen, smoothScrollTo]);

  // Optimized scroll handling with requestAnimationFrame
  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      const scrollY = window.scrollY;
      
      setIsScrolled(scrollY > 50);
      
      if (Math.abs(scrollY - lastScrollY) > 10) { // Increased threshold for better performance
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

  // Mobile nav click handler
  const handleMobileNavClick = useCallback((e, href) => {
    handleNavClick(e, href);
  }, [handleNavClick]);

  // Optimized escape key handler
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  // Optimized scroll lock
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
        
        <nav className="nav">
          <a href="#home" className="nav-link" onClick={(e) => handleNavClick(e, '#home')}>Home</a>
          <a href="#markets" className="nav-link" onClick={(e) => handleNavClick(e, '#markets')}>Markets</a>
          <a href="#about" className="nav-link" onClick={(e) => handleNavClick(e, '#about')}>About</a>
          <a href="#contact" className="nav-link" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a>
        </nav>
        
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

      {isMenuOpen && (
        <div 
          className="mobile-overlay" 
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
