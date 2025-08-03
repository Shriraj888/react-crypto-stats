import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './GridMotion.css';

const GridMotion = ({ items = [], gradientColor = 'black' }) => {
  const gridRef = useRef(null);
  const rowRefs = useRef([]);
  const mouseXRef = useRef(window.innerWidth / 2);

  const totalItems = 28;
  const defaultItems = Array.from({ length: totalItems }, (_, index) => `Item ${index + 1}`);
  
  // Handle both crypto objects and string items
  const combinedItems = items.length > 0 ? items.slice(0, totalItems) : defaultItems;

  // Format price for display
  const formatPrice = (price) => {
    if (price === null || price === undefined || isNaN(price)) {
      return '$0.00';
    }
    if (price > 1) {
      return `$${price.toFixed(2)}`;
    } else {
      return `$${price.toFixed(6)}`;
    }
  };

  // Format percentage with color
  const formatChange = (change) => {
    if (change === null || change === undefined || isNaN(change)) {
      return {
        text: '0.0%',
        isPositive: true
      };
    }
    const formatted = `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;
    return {
      text: formatted,
      isPositive: change >= 0
    };
  };

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);

    const handleMouseMove = (e) => {
      if (e && e.clientX !== undefined) {
        mouseXRef.current = e.clientX;
      }
    };

    const updateMotion = () => {
      const maxMoveAmount = 300;
      const baseDuration = 0.8;
      const inertiaFactors = [0.6, 0.4, 0.3, 0.2];

      rowRefs.current.forEach((row, index) => {
        if (row && mouseXRef.current !== undefined) {
          const direction = index % 2 === 0 ? 1 : -1;
          const moveAmount = ((mouseXRef.current / window.innerWidth) * maxMoveAmount - maxMoveAmount / 2) * direction;

          gsap.to(row, {
            x: moveAmount,
            duration: baseDuration + inertiaFactors[index % inertiaFactors.length],
            ease: 'power3.out',
            overwrite: 'auto',
          });
        }
      });
    };

    const removeAnimationLoop = gsap.ticker.add(updateMotion);

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      removeAnimationLoop();
    };
  }, []);

  return (
    <div className="noscroll loading" ref={gridRef}>
      <section
        className="intro"
        style={{
          background: `radial-gradient(circle, ${gradientColor} 0%, transparent 100%)`,
        }}
      >
        <div className="gridMotion-container">
          {[...Array(4)].map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="row"
              ref={(el) => (rowRefs.current[rowIndex] = el)}
            >
              {[...Array(7)].map((_, itemIndex) => {
                const content = combinedItems[rowIndex * 7 + itemIndex];
                return (
                  <div key={itemIndex} className="row__item">
                    <div className="row__item-inner" style={{ backgroundColor: '#111' }}>
                      {typeof content === 'object' && content.symbol ? (
                        // Crypto data display
                        <div className="crypto-grid-item">
                          {content.image && (
                            <img
                              src={content.image}
                              alt={content.symbol}
                              className="crypto-icon"
                            />
                          )}
                          <div className="crypto-info">
                            <div className="crypto-symbol">{content.symbol.toUpperCase()}</div>
                            <div className="crypto-price">
                              {formatPrice(content.quote?.USD?.price || content.current_price)}
                            </div>
                            <div
                              className={`crypto-change ${
                                (content.quote?.USD?.percent_change_24h || content.price_change_percentage_24h || 0) >= 0 ? 'positive' : 'negative'
                              }`}
                            >
                              {formatChange(content.quote?.USD?.percent_change_24h || content.price_change_percentage_24h).text}
                            </div>
                          </div>
                        </div>
                      ) : typeof content === 'string' && content.startsWith('http') ? (
                        <div
                          className="row__item-img"
                          style={{
                            backgroundImage: `url(${content})`,
                          }}
                        ></div>
                      ) : (
                        <div className="row__item-content">{content}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="fullview"></div>
      </section>
    </div>
  );
};

export default GridMotion;
