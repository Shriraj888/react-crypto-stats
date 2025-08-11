import React, { useMemo, useCallback, memo, useRef } from 'react';
import { TrendingUp, TrendingDown, RefreshCw, BarChart3 } from 'lucide-react';
import './CryptoGrid.css';

// Memoized crypto card component for better performance
const CryptoCard = memo(({ crypto }) => {
  const formatPrice = useCallback((price) => {
    if (!price) return '$0.00';
    if (price < 0.01) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 6,
        maximumFractionDigits: 8,
      }).format(price);
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(price);
  }, []);

  const formatPercentage = useCallback((percentage) => {
    if (typeof percentage !== 'number') return '0.00%';
    return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  }, []);

  const formatCompactNumber = useCallback((value) => {
    if (!value) return '$0';
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;
    return `$${value.toFixed(0)}`;
  }, []);

  // Memoize calculated values to prevent recalculation on every render
  const { priceChange24h, priceChange7d, isPositive24h, isPositive7d } = useMemo(() => {
    const change24h = crypto.quote?.USD?.percent_change_24h || 0;
    const change7d = crypto.quote?.USD?.percent_change_7d || 0;
    
    return {
      priceChange24h: change24h,
      priceChange7d: change7d,
      isPositive24h: change24h >= 0,
      isPositive7d: change7d >= 0
    };
  }, [crypto.quote?.USD?.percent_change_24h, crypto.quote?.USD?.percent_change_7d]);

  return (
    <div 
      className="crypto-card" 
      tabIndex={0} 
      role="button" 
      aria-label={`${crypto.name} cryptocurrency details`}
      data-crypto-id={crypto.id}
    >
      {/* Modern card background with subtle gradient */}
      <div className="crypto-card-bg"></div>
      
      {/* Sleek price trend indicator */}
      <div className={`price-trend-indicator ${isPositive24h ? 'trending-up' : 'trending-down'}`}>
        <div className="trend-arrow">
          {isPositive24h ? '↗' : '↘'}
        </div>
      </div>
      
      <div className="crypto-card-header">
        <div className="crypto-main-info">
          <div className="crypto-logo-container">
            <div className="logo-backdrop"></div>
            <img 
              src={crypto.image} 
              alt={`${crypto.name} logo`}
              className="crypto-logo"
              loading="lazy"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="crypto-logo-fallback" style={{ display: 'none' }}>
              {crypto.symbol.charAt(0)}
            </div>
          </div>
          <div className="crypto-info">
            <h3 className="crypto-name">
              {crypto.name}
              <div className="live-pulse"></div>
            </h3>
            <span className="crypto-symbol">{crypto.symbol}</span>
          </div>
        </div>
        <div className="crypto-actions">
          <div className="crypto-rank-modern">
            <span className="rank-number">#{crypto.cmc_rank || 'N/A'}</span>
          </div>
        </div>
      </div>
      
      <div className="crypto-price-section">
        <div className="price-main">
          <div className="crypto-price">
            <span className="price-currency">$</span>
            <span className="price-value">{formatPrice(crypto.quote?.USD?.price || 0).replace('$', '')}</span>
          </div>
          <div className={`crypto-change ${isPositive24h ? 'positive' : 'negative'}`}>
            <div className="change-indicator">
              {isPositive24h ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            </div>
            <span className="change-value">{formatPercentage(priceChange24h)}</span>
          </div>
        </div>
        
        {/* Simplified mini chart */}
        <div className="price-chart">
          <svg width="80" height="30" className="mini-chart">
            <defs>
              <linearGradient id={`gradient-${crypto.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={isPositive24h ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)'} />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <path 
              d={`M 0 ${isPositive24h ? 20 : 10} Q 20 ${isPositive24h ? 15 : 12} 40 ${isPositive24h ? 12 : 18} T 80 ${isPositive24h ? 8 : 22}`}
              stroke={isPositive24h ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)'} 
              strokeWidth="1.5" 
              fill={`url(#gradient-${crypto.id})`}
              className="price-path"
            />
          </svg>
        </div>
      </div>
      
      <div className="crypto-stats">
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Market Cap</span>
            <span className="stat-value">
              {formatCompactNumber(crypto.quote?.USD?.market_cap || 0)}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Volume 24h</span>
            <span className="stat-value">
              {formatCompactNumber(crypto.quote?.USD?.volume_24h || 0)}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">7d Change</span>
            <span className={`stat-value ${isPositive7d ? 'positive' : 'negative'}`}>
              {formatPercentage(priceChange7d)}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Supply</span>
            <span className="stat-value">
              {crypto.circulating_supply ? formatCompactNumber(crypto.circulating_supply) : 'N/A'}
            </span>
          </div>
        </div>
        
        {/* Streamlined performance bar */}
        <div className="performance-indicator">
          <div className="performance-track">
            <div 
              className={`performance-fill ${isPositive24h ? 'positive' : 'negative'}`}
              style={{ 
                width: `${Math.min(Math.abs(priceChange24h) * 3, 100)}%`
              }}
            ></div>
          </div>
          <span className="performance-text">24h {isPositive24h ? 'gain' : 'loss'}</span>
        </div>
      </div>

      {/* Enhanced action area */}
      <div className="crypto-footer">
        <div className="status-indicators">
          <div className="live-indicator-badge">
            <div className="pulse-dot"></div>
            <span className="live-text">Live Data</span>
          </div>
          <div className="update-timestamp">
            <span>Updated now</span>
          </div>
        </div>
        <div 
          className="chart-access-button"
          role="button"
          tabIndex={0}
          aria-label="View detailed chart"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              // Handle chart view
            }
          }}
        >
          <BarChart3 size={16} />
          <span>Chart</span>
        </div>
      </div>
      
      {/* Smooth hover overlay */}
      <div className="card-overlay"></div>
    </div>
  );
});

CryptoCard.displayName = 'CryptoCard';

const CryptoGrid = ({ cryptoData, loading, loadingMore, error, hasMoreData, onRefresh, onLoadMore }) => {
  const sectionRef = useRef(null);

  const filteredAndSortedData = useMemo(() => {
    if (!cryptoData || cryptoData.length === 0) return [];
    return cryptoData;
  }, [cryptoData]);

  const handleRefresh = useCallback(() => {
    onRefresh();
  }, [onRefresh]);

  const handleLoadMore = useCallback(() => {
    onLoadMore();
  }, [onLoadMore]);

  if (loading) {
    return (
      <section className="crypto-section" id="markets" ref={sectionRef}>
        <div className="crypto-container">
          <div className="loading-container">
            <div className="loading-animation">
              <div className="loading-spinner"></div>
              <div className="loading-ripples">
                <div className="ripple"></div>
                <div className="ripple"></div>
                <div className="ripple"></div>
              </div>
            </div>
            <p className="loading-text">Fetching live market data...</p>
            <div className="loading-progress">
              <div className="progress-bar"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="crypto-section" id="markets" ref={sectionRef}>
        <div className="crypto-container">
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h3>Unable to Load Market Data</h3>
            <p>Error: {error}</p>
            <button className="refresh-control error-retry" onClick={handleRefresh}>
              <div className="refresh-icon-container">
                <RefreshCw size={16} />
              </div>
              <div className="refresh-content">
                <span className="refresh-label">Retry</span>
                <span className="refresh-subtitle">Try again</span>
              </div>
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="crypto-section" id="markets" ref={sectionRef}>
      <div className="crypto-container">
        <div className="crypto-grid">
          {filteredAndSortedData.map((crypto) => (
            <CryptoCard
              key={crypto.id}
              crypto={crypto}
            />
          ))}
        </div>
        
        {hasMoreData && (
          <div className="load-more-container">
            <div 
              className={`load-more-control ${loadingMore ? 'loading' : ''}`}
              onClick={loadingMore ? undefined : handleLoadMore}
              role="button"
              tabIndex={loadingMore ? -1 : 0}
              aria-label="Load more cryptocurrencies"
              aria-disabled={loadingMore}
              onKeyDown={(e) => {
                if (!loadingMore && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  handleLoadMore();
                }
              }}
            >
              <div className="load-more-icon">
                {loadingMore ? (
                  <div className="loading-spinner-mini"></div>
                ) : (
                  <TrendingUp size={16} />
                )}
              </div>
              <div className="load-more-content">
                <span className="load-more-label">
                  {loadingMore ? 'Loading...' : 'Load More'}
                </span>
                <span className="load-more-info">
                  {loadingMore ? 'Fetching data' : `${cryptoData.length} loaded`}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default memo(CryptoGrid);
