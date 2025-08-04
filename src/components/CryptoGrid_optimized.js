import React, { useState, useMemo, useCallback, memo } from 'react';
import { TrendingUp, TrendingDown, RefreshCw, Search, Filter, BarChart3, Star, StarOff, Zap } from 'lucide-react';
import './CryptoGrid.css';

// Memoized crypto card component for better performance
const CryptoCard = memo(({ crypto, isFavorite, onToggleFavorite }) => {
  const formatPrice = useCallback((price) => {
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
    return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  }, []);

  const formatCompactNumber = useCallback((value) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;
    return `$${value.toFixed(0)}`;
  }, []);

  const handleFavoriteClick = useCallback((e) => {
    e.stopPropagation();
    onToggleFavorite(crypto.id);
  }, [crypto.id, onToggleFavorite]);

  const priceChange24h = crypto.quote?.USD?.percent_change_24h || 0;
  const priceChange7d = crypto.quote?.USD?.percent_change_7d || 0;
  const isPositive24h = priceChange24h >= 0;
  const isPositive7d = priceChange7d >= 0;

  return (
    <div className="crypto-card" tabIndex={0} role="button" aria-label={`${crypto.name} cryptocurrency details`}>
      <div className="crypto-card-header">
        <div className="crypto-main-info">
          <div className="crypto-logo-container">
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
            <h3 className="crypto-name">{crypto.name}</h3>
            <span className="crypto-symbol">{crypto.symbol}</span>
          </div>
        </div>
        <div className="crypto-actions">
          <button
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
            onClick={handleFavoriteClick}
            aria-label={`${isFavorite ? 'Remove from' : 'Add to'} favorites`}
          >
            {isFavorite ? <Star size={16} /> : <StarOff size={16} />}
          </button>
          <div className="crypto-rank">#{crypto.cmc_rank}</div>
        </div>
      </div>
      
      <div className="crypto-price-section">
        <div className="crypto-price">
          {formatPrice(crypto.quote.USD.price)}
        </div>
        <div className={`crypto-change ${isPositive24h ? 'positive' : 'negative'}`}>
          {isPositive24h ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {formatPercentage(priceChange24h)}
        </div>
      </div>
      
      <div className="crypto-stats">
        <div className="stat-row">
          <div className="stat-item">
            <span className="stat-label">Market Cap</span>
            <span className="stat-value">
              {formatCompactNumber(crypto.quote.USD.market_cap)}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Volume 24h</span>
            <span className="stat-value">
              {formatCompactNumber(crypto.quote.USD.volume_24h)}
            </span>
          </div>
        </div>
        
        <div className="stat-row">
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
      </div>

      <div className="crypto-chart-placeholder">
        <BarChart3 size={20} />
        <span>Price Chart</span>
      </div>
    </div>
  );
});

CryptoCard.displayName = 'CryptoCard';

const CryptoGrid = ({ cryptoData, loading, loadingMore, error, hasMoreData, onRefresh, onLoadMore }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('market_cap');
  const [favorites, setFavorites] = useState(new Set());
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const toggleFavorite = useCallback((cryptoId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(cryptoId)) {
        newFavorites.delete(cryptoId);
      } else {
        newFavorites.add(cryptoId);
      }
      return newFavorites;
    });
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleSortChange = useCallback((e) => {
    setSortBy(e.target.value);
  }, []);

  const filteredAndSortedData = useMemo(() => {
    if (!cryptoData || cryptoData.length === 0) return [];
    
    let filtered = cryptoData.filter(crypto => {
      const matchesSearch = crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (showOnlyFavorites) {
        return matchesSearch && favorites.has(crypto.id);
      }
      
      return matchesSearch;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'market_cap':
          return (b.quote?.USD?.market_cap || 0) - (a.quote?.USD?.market_cap || 0);
        case 'price':
          return (b.quote?.USD?.price || 0) - (a.quote?.USD?.price || 0);
        case 'change_24h':
          return (b.quote?.USD?.percent_change_24h || 0) - (a.quote?.USD?.percent_change_24h || 0);
        case 'volume':
          return (b.quote?.USD?.volume_24h || 0) - (a.quote?.USD?.volume_24h || 0);
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [cryptoData, searchTerm, sortBy, showOnlyFavorites, favorites]);

  const handleRefresh = useCallback(() => {
    onRefresh();
  }, [onRefresh]);

  const handleLoadMore = useCallback(() => {
    onLoadMore();
  }, [onLoadMore]);

  if (loading) {
    return (
      <section className="crypto-section" id="markets">
        <div className="crypto-container">
          <div className="section-header">
            <h2>Live Cryptocurrency Prices</h2>
            <p>Real-time market data and trading insights</p>
          </div>
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Fetching live market data...</p>
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
            <p>Real-time market data and trading insights</p>
          </div>
          <div className="error-container">
            <h3>Unable to Load Market Data</h3>
            <p>Error: {error}</p>
            <button className="refresh-btn" onClick={handleRefresh}>
              <RefreshCw size={16} />
              Retry Connection
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
          <p>Real-time market data and trading insights</p>
          <button className="refresh-btn" onClick={handleRefresh}>
            <RefreshCw size={16} />
            Refresh Data
          </button>
        </div>

        {/* Enhanced Controls */}
        <div className="crypto-controls">
          <div className="search-container">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search cryptocurrencies..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>
          
          <div className="filter-container">
            <Filter size={18} className="filter-icon" />
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="filter-select"
            >
              <option value="market_cap">Market Cap</option>
              <option value="price">Price</option>
              <option value="change_24h">24h Change</option>
              <option value="volume">Volume</option>
              <option value="name">Name</option>
            </select>
          </div>

          {favorites.size > 0 && (
            <button
              className={`favorites-toggle ${showOnlyFavorites ? 'active' : ''}`}
              onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            >
              <Star size={16} />
              {showOnlyFavorites ? 'Show All' : `Favorites (${favorites.size})`}
            </button>
          )}
        </div>

        {/* Performance Stats */}
        <div className="market-overview">
          <div className="overview-stat">
            <Zap size={16} />
            <span>{filteredAndSortedData.length} Cryptocurrencies</span>
          </div>
          <div className="overview-stat">
            <TrendingUp size={16} />
            <span>Live Updates</span>
          </div>
          {favorites.size > 0 && (
            <div className="overview-stat">
              <Star size={16} />
              <span>{favorites.size} Favorites</span>
            </div>
          )}
        </div>
        
        <div className="crypto-grid">
          {filteredAndSortedData.map((crypto) => (
            <CryptoCard
              key={crypto.id}
              crypto={crypto}
              isFavorite={favorites.has(crypto.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
        
        {filteredAndSortedData.length === 0 && searchTerm && (
          <div className="no-results">
            <h3>No cryptocurrencies found</h3>
            <p>Try adjusting your search terms or clear filters</p>
            <button onClick={() => setSearchTerm('')} className="clear-search-btn">
              Clear Search
            </button>
          </div>
        )}
        
        {filteredAndSortedData.length === 0 && showOnlyFavorites && favorites.size === 0 && (
          <div className="no-results">
            <h3>No favorites yet</h3>
            <p>Add cryptocurrencies to your favorites by clicking the star icon</p>
            <button onClick={() => setShowOnlyFavorites(false)} className="clear-search-btn">
              Show All Cryptocurrencies
            </button>
          </div>
        )}
        
        {hasMoreData && !showOnlyFavorites && (
          <div className="load-more-container">
            <button 
              className="load-more-btn" 
              onClick={handleLoadMore}
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
                  Load More Cryptocurrencies ({cryptoData.length} loaded)
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default memo(CryptoGrid);
