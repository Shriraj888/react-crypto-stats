import React, { useState, useEffect, useMemo, useCallback, lazy, Suspense } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import perfMonitor from './utils/performance';
import demoDataService from './services/demoDataService';

// ========================================
// 🔑 API CONFIGURATION INSTRUCTIONS
// ========================================
// To use real-time cryptocurrency data instead of demo data:
// 1. Replace 'demoDataService' with actual API calls
// 2. Get API keys from:
//    - CoinMarketCap: https://coinmarketcap.com/api/
//    - CoinGecko: https://www.coingecko.com/en/api
//    - Binance: https://binance-docs.github.io/apidocs/
// 3. Add your API key in the fetchCryptoData function below
// 4. Update API endpoints and headers accordingly
// ========================================

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

  // Demo fetch function using demo data service
  // 🔑 TO USE REAL API: Replace this entire function with actual API calls
  const fetchCryptoData = useCallback(async (page = 1, isLoadMore = false) => {
    return await perfMonitor.measureApiCall('demo_markets', async () => {
      try {
        if (!isLoadMore) {
          setLoading(true);
        } else {
          setLoadingMore(true);
        }
        
        // 🔑 DEMO DATA SERVICE - Replace with real API
        // Example for CoinMarketCap:
        // const API_KEY = 'YOUR_CMC_API_KEY_HERE';
        // const response = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=${(page-1)*20+1}&limit=20`, {
        //   headers: {
        //     'X-CMC_PRO_API_KEY': API_KEY,
        //     'Accept': 'application/json'
        //   }
        // });
        // const result = await response.json();
        // const data = result.data;
        
        // Example for CoinGecko Pro:
        // const API_KEY = 'YOUR_COINGECKO_API_KEY_HERE';
        // const response = await fetch(`https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=${page}&x_cg_pro_api_key=${API_KEY}`);
        // const data = await response.json();
        
        const response = await demoDataService.getLiveData(page);
        
        if (isLoadMore) {
          setCryptoData(prevData => [...prevData, ...response.data]);
        } else {
          setCryptoData(response.data);
        }
        
        setHasMoreData(response.hasMore);
        setError(null);
      } catch (err) {
        setError('Demo data loading failed');
        console.error('Error loading demo data:', err);
        throw err;
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    });
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
    
    // Log performance summary after initial load
    const timer = setTimeout(() => {
      perfMonitor.logReport();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [fetchCryptoData]);

  return (
    <div className="App">
      {/* Demo Banner */}
      <div className="demo-banner">
        <div className="demo-banner-content">
          <span className="demo-badge">DEMO MODE</span>
          <span className="demo-text">This application is running with simulated cryptocurrency data for demonstration purposes.</span>
        </div>
      </div>
      
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
