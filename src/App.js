import React, { useState, useEffect, useMemo, useCallback, lazy, Suspense } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';

// Lazy load components that are below the fold
const CryptoGrid = lazy(() => import('./components/CryptoGrid'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

// Loading component for lazy-loaded components
const ComponentLoader = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '200px',
    color: '#ffffff'
  }}>
    Loading...
  </div>
);

function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);

  // Optimized fetch function with useCallback
  const fetchCryptoData = useCallback(async (page = 1, isLoadMore = false) => {
    try {
      if (!isLoadMore) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      
      // Using CoinGecko API with reduced data for better performance
      const COINGECKO_URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=${page}&sparkline=false&price_change_percentage=24h`;
      
      const response = await fetch(COINGECKO_URL);
      
      if (!response.ok) {
        throw new Error('Failed to fetch crypto data');
      }
      
      const data = await response.json();
      
      // Optimized data transformation
      const transformedData = data.map((coin, index) => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol.toUpperCase(),
        cmc_rank: coin.market_cap_rank || ((page - 1) * 20 + index + 1),
        image: coin.image,
        quote: {
          USD: {
            price: coin.current_price,
            percent_change_24h: coin.price_change_percentage_24h || 0,
            market_cap: coin.market_cap,
            volume_24h: coin.total_volume
          }
        }
      }));
      
      if (isLoadMore) {
        setCryptoData(prevData => [...prevData, ...transformedData]);
      } else {
        setCryptoData(transformedData);
      }
      
      setHasMoreData(data.length === 20);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching crypto data:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  // Optimized load more function
  const loadMoreCryptos = useCallback(() => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchCryptoData(nextPage, true);
  }, [currentPage, fetchCryptoData]);

  // Optimized refresh function
  const handleRefresh = useCallback(() => {
    setCurrentPage(1);
    fetchCryptoData(1, false);
  }, [fetchCryptoData]);

  // Memoized data to prevent unnecessary re-renders
  const memoizedCryptoData = useMemo(() => cryptoData, [cryptoData]);

  useEffect(() => {
    fetchCryptoData();
  }, [fetchCryptoData]);

  return (
    <div className="App">
      <Header />
      <Hero cryptoData={memoizedCryptoData} />
      
      <Suspense fallback={<ComponentLoader />}>
        <CryptoGrid 
          cryptoData={memoizedCryptoData} 
          loading={loading} 
          loadingMore={loadingMore}
          error={error} 
          hasMoreData={hasMoreData}
          onRefresh={handleRefresh}
          onLoadMore={loadMoreCryptos}
        />
      </Suspense>
      
      <Suspense fallback={<ComponentLoader />}>
        <About cryptoData={memoizedCryptoData} />
      </Suspense>
      
      <Suspense fallback={<ComponentLoader />}>
        <Contact />
      </Suspense>
      
      <Suspense fallback={<ComponentLoader />}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
