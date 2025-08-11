import { demoCryptoData, generateMoreDemoData, demoMarketSummary } from '../data/demoData';

// ========================================
// 🔑 DEMO DATA SERVICE - FOR REAL API INTEGRATION
// ========================================
// This file contains demo/mock data for demonstration purposes.
// To integrate with real cryptocurrency APIs:
//
// 1. REPLACE THIS ENTIRE FILE with actual API service calls
// 2. Popular API options:
//    - CoinMarketCap Pro API: https://coinmarketcap.com/api/
//    - CoinGecko Pro API: https://www.coingecko.com/en/api
//    - Binance API: https://binance-docs.github.io/apidocs/
//    - CryptoCompare API: https://min-api.cryptocompare.com/
//
// 3. Example API service structure:
//    - Get your API key from the provider
//    - Replace demo methods with actual HTTP requests
//    - Handle authentication, rate limiting, and error handling
//    - Transform API responses to match the expected data structure
// ========================================

class DemoDataService {
  constructor() {
    this.cache = new Map();
    this.lastUpdate = Date.now();
    
    // 🔑 FOR REAL API: Add your API configuration here
    // this.apiKey = 'YOUR_API_KEY_HERE';
    // this.baseUrl = 'https://pro-api.coinmarketcap.com/v1'; // or your chosen API
    // this.headers = {
    //   'X-CMC_PRO_API_KEY': this.apiKey,
    //   'Accept': 'application/json'
    // };
  }

  // Simulate live price updates
  // 🔑 FOR REAL API: Replace with actual API call
  getLiveData(page = 1) {
    // FOR REAL API IMPLEMENTATION:
    // return fetch(`${this.baseUrl}/cryptocurrency/listings/latest?start=${(page-1)*20+1}&limit=20`, {
    //   headers: this.headers
    // })
    // .then(response => response.json())
    // .then(result => ({
    //   data: result.data,
    //   hasMore: result.data.length === 20,
    //   totalPages: Math.ceil(result.status.total_count / 20)
    // }));
    
    return new Promise((resolve) => {
      setTimeout(() => {
        let data;
        if (page === 1) {
          // Add some realistic price fluctuations to demo data
          data = demoCryptoData.map(coin => ({
            ...coin,
            quote: {
              USD: {
                ...coin.quote.USD,
                price: coin.quote.USD.price * (1 + (Math.random() - 0.5) * 0.02), // ±1% fluctuation
                percent_change_24h: coin.quote.USD.percent_change_24h + (Math.random() - 0.5) * 0.5
              }
            }
          }));
        } else {
          data = generateMoreDemoData(page);
        }
        
        resolve({
          data,
          hasMore: page < 5,
          totalPages: 5
        });
      }, Math.random() * 500 + 300); // Random delay between 300-800ms
    });
  }

  // Get market summary
  // 🔑 FOR REAL API: Replace with actual market summary endpoint
  getMarketSummary() {
    // FOR REAL API IMPLEMENTATION:
    // return fetch(`${this.baseUrl}/global-metrics/quotes/latest`, {
    //   headers: this.headers
    // })
    // .then(response => response.json())
    // .then(result => result.data);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...demoMarketSummary,
          totalMarketCap: demoMarketSummary.totalMarketCap * (1 + (Math.random() - 0.5) * 0.01),
          totalVolume: demoMarketSummary.totalVolume * (1 + (Math.random() - 0.5) * 0.05)
        });
      }, 200);
    });
  }

  // Get trending coins
  // 🔑 FOR REAL API: Replace with actual trending endpoint
  getTrendingCoins() {
    // FOR REAL API IMPLEMENTATION:
    // return fetch(`${this.baseUrl}/cryptocurrency/trending/latest`, {
    //   headers: this.headers
    // })
    // .then(response => response.json())
    // .then(result => result.data);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const trending = demoCryptoData
          .sort((a, b) => b.quote.USD.percent_change_24h - a.quote.USD.percent_change_24h)
          .slice(0, 10);
        
        resolve(trending);
      }, 300);
    });
  }

  // Search functionality
  // 🔑 FOR REAL API: Replace with actual search endpoint
  searchCoins(query) {
    // FOR REAL API IMPLEMENTATION:
    // return fetch(`${this.baseUrl}/cryptocurrency/map?symbol=${query}`, {
    //   headers: this.headers
    // })
    // .then(response => response.json())
    // .then(result => result.data);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = demoCryptoData.filter(coin => 
          coin.name.toLowerCase().includes(query.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(query.toLowerCase())
        );
        resolve(results);
      }, 200);
    });
  }

  // Get coin details
  // 🔑 FOR REAL API: Replace with actual coin info endpoint
  getCoinDetails(coinId) {
    // FOR REAL API IMPLEMENTATION:
    // return fetch(`${this.baseUrl}/cryptocurrency/info?id=${coinId}`, {
    //   headers: this.headers
    // })
    // .then(response => response.json())
    // .then(result => result.data[coinId]);
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const coin = demoCryptoData.find(c => c.id === coinId);
        if (coin) {
          resolve({
            ...coin,
            description: `${coin.name} is a decentralized digital currency. This is demo data for presentation purposes.`,
            website: `https://demo-${coin.id}.com`,
            github: `https://github.com/demo-${coin.id}`,
            social: {
              twitter: `@demo${coin.symbol}`,
              telegram: `https://t.me/demo${coin.symbol}`,
              reddit: `https://reddit.com/r/demo${coin.symbol}`
            }
          });
        } else {
          reject(new Error('Coin not found'));
        }
      }, 400);
    });
  }

  // Simulate real-time price updates
  startPriceUpdates(callback) {
    const interval = setInterval(() => {
      const updatedData = demoCryptoData.map(coin => ({
        ...coin,
        quote: {
          USD: {
            ...coin.quote.USD,
            price: coin.quote.USD.price * (1 + (Math.random() - 0.5) * 0.001), // Small fluctuations
          }
        }
      }));
      
      callback(updatedData);
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }
}

const demoDataService = new DemoDataService();
export default demoDataService;
