import React from 'react';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import './CryptoGrid.css';

const CryptoGrid = ({ cryptoData, loading, loadingMore, error, hasMoreData, onRefresh, onLoadMore }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(price);
  };

  const formatPercentage = (percentage) => {
    return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`;
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`;
    }
    return `$${marketCap.toFixed(0)}`;
  };

  if (loading) {
    return (
      <section className="crypto-section" id="markets">
        <div className="crypto-container">
          <div className="section-header">
            <h2>Live Cryptocurrency Prices</h2>
            <p>Real-time market data and trends</p>
          </div>
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading cryptocurrency data...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="crypto-section" id="markets">
        <div className="crypto-container">
          <div className="section-header">
            <h2>Live Cryptocurrency Prices</h2>
            <p>Real-time market data and trends</p>
          </div>
          <div className="error-container">
            <p>Error loading cryptocurrency data: {error}</p>
            <button className="refresh-btn" onClick={onRefresh}>
              <RefreshCw size={16} />
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="crypto-section" id="markets">
      <div className="crypto-container">
        <div className="section-header">
          <h2>Live Cryptocurrency Prices</h2>
          <p>Real-time market data and trends</p>
          <button className="refresh-btn" onClick={onRefresh}>
            <RefreshCw size={16} />
            Refresh Data
          </button>
        </div>
        
        <div className="crypto-grid">
          {cryptoData.map((crypto) => (
            <div key={crypto.id} className="crypto-card">
              <div className="crypto-header">
                <div className="crypto-info">
                  <div className="crypto-logo-name">
                    <img 
                      src={crypto.image} 
                      alt={`${crypto.name} logo`}
                      className="crypto-logo"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="crypto-text-info">
                      <h3 className="crypto-name">{crypto.name}</h3>
                      <span className="crypto-symbol">{crypto.symbol}</span>
                    </div>
                  </div>
                </div>
                <div className="crypto-rank">#{crypto.cmc_rank}</div>
              </div>
              
              <div className="crypto-price">
                {formatPrice(crypto.quote.USD.price)}
              </div>
              
              <div className="crypto-stats">
                <div className="stat-item">
                  <span className="stat-label">24h Change</span>
                  <span className={`stat-value ${crypto.quote.USD.percent_change_24h >= 0 ? 'positive' : 'negative'}`}>
                    {crypto.quote.USD.percent_change_24h >= 0 ? (
                      <TrendingUp size={14} />
                    ) : (
                      <TrendingDown size={14} />
                    )}
                    {formatPercentage(crypto.quote.USD.percent_change_24h)}
                  </span>
                </div>
                
                <div className="stat-item">
                  <span className="stat-label">Market Cap</span>
                  <span className="stat-value">
                    {formatMarketCap(crypto.quote.USD.market_cap)}
                  </span>
                </div>
                
                <div className="stat-item">
                  <span className="stat-label">Volume (24h)</span>
                  <span className="stat-value">
                    {formatMarketCap(crypto.quote.USD.volume_24h)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {hasMoreData && (
          <div className="load-more-container">
            <button 
              className="load-more-btn" 
              onClick={onLoadMore}
              disabled={loadingMore}
            >
              {loadingMore ? (
                <>
                  <div className="loading-spinner-small"></div>
                  Loading More...
                </>
              ) : (
                <>
                  <TrendingUp size={16} />
                  Load More Cryptocurrencies
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CryptoGrid;
