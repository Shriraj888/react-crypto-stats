import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import CryptoGrid from './components/CryptoGrid';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);

  // Using CoinGecko API as alternative to avoid CORS issues
  // Your CoinMarketCap API key: 026530c3-17e3-4183-a336-14429a7b3bd6 (saved for future backend integration)

  useEffect(() => {
    fetchCryptoData();
  }, []);

  const fetchCryptoData = async (page = 1, isLoadMore = false) => {
    try {
      if (!isLoadMore) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      
      // Using CoinGecko API which includes image URLs and doesn't require API key
      const COINGECKO_URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=${page}&sparkline=false&price_change_percentage=24h`;
      
      const response = await fetch(COINGECKO_URL);
      
      if (!response.ok) {
        throw new Error('Failed to fetch crypto data');
      }
      
      const data = await response.json();
      
      // Transform CoinGecko data to match our component format, including images
      const transformedData = data.map((coin, index) => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol.toUpperCase(),
        cmc_rank: coin.market_cap_rank || ((page - 1) * 12 + index + 1),
        image: coin.image, // Add image URL from CoinGecko
        quote: {
          USD: {
            price: coin.current_price,
            percent_change_24h: coin.price_change_percentage_24h,
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
      
      // Check if we have more data (CoinGecko has thousands of coins)
      setHasMoreData(data.length === 12);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching crypto data:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMoreCryptos = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchCryptoData(nextPage, true);
  };

  return (
    <div className="App">
      <Header />
      <Hero cryptoData={cryptoData} />
      <CryptoGrid 
        cryptoData={cryptoData} 
        loading={loading} 
        loadingMore={loadingMore}
        error={error} 
        hasMoreData={hasMoreData}
        onRefresh={() => {
          setCurrentPage(1);
          fetchCryptoData(1, false);
        }}
        onLoadMore={loadMoreCryptos}
      />
      <About cryptoData={cryptoData} />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
