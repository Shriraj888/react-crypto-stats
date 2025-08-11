# Crypto Stats React - API Integration Guide

This React application displays cryptocurrency market data in a modern, responsive interface. Currently configured with **demo data** for presentation purposes.

## 🔑 API Integration Instructions

### Quick Start - Switch to Real Data

To integrate with real cryptocurrency APIs, follow these steps:

### 1. Choose Your API Provider

**Popular Options:**
- **CoinMarketCap Pro** - Most comprehensive data
- **CoinGecko Pro** - Good free tier, reliable
- **Binance API** - Real-time trading data
- **CryptoCompare** - Historical and live data

### 2. Get Your API Key

**CoinMarketCap:**
1. Visit: https://coinmarketcap.com/api/
2. Sign up for a free account
3. Get your API key from the dashboard

**CoinGecko:**
1. Visit: https://www.coingecko.com/en/api
2. Sign up for Pro API (free tier available)
3. Get your API key

### 3. Update the Code

#### Replace Demo Service (src/services/demoDataService.js)

```javascript
class RealDataService {
  constructor() {
    // 🔑 ADD YOUR API KEY HERE
    this.apiKey = 'YOUR_API_KEY_HERE';
    this.baseUrl = 'https://pro-api.coinmarketcap.com/v1';
    this.headers = {
      'X-CMC_PRO_API_KEY': this.apiKey,
      'Accept': 'application/json'
    };
  }

  async getLiveData(page = 1) {
    try {
      const response = await fetch(
        `${this.baseUrl}/cryptocurrency/listings/latest?start=${(page-1)*20+1}&limit=20`,
        { headers: this.headers }
      );
      const result = await response.json();
      
      return {
        data: result.data.map(coin => ({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          cmc_rank: coin.cmc_rank,
          image: `https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`,
          quote: {
            USD: {
              price: coin.quote.USD.price,
              percent_change_24h: coin.quote.USD.percent_change_24h,
              market_cap: coin.quote.USD.market_cap,
              volume_24h: coin.quote.USD.volume_24h
            }
          }
        })),
        hasMore: result.data.length === 20
      };
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
}
```

#### Update App.js

Replace the demo import:
```javascript
// Remove this line:
import demoDataService from './services/demoDataService';

// Add this line:
import realDataService from './services/realDataService';
```

### 4. Environment Variables (Optional)

For better security, use environment variables:

1. Create `.env.local` file in project root:
```env
REACT_APP_CMC_API_KEY=your_coinmarketcap_api_key_here
REACT_APP_COINGECKO_API_KEY=your_coingecko_api_key_here
```

2. Use in your service:
```javascript
this.apiKey = process.env.REACT_APP_CMC_API_KEY;
```

### 5. API Endpoints Reference

#### CoinMarketCap Pro API
```javascript
// Latest listings
GET /v1/cryptocurrency/listings/latest

// Global metrics
GET /v1/global-metrics/quotes/latest

// Coin info
GET /v1/cryptocurrency/info

// Headers required:
{
  'X-CMC_PRO_API_KEY': 'your_api_key',
  'Accept': 'application/json'
}
```

#### CoinGecko Pro API
```javascript
// Market data
GET /api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1

// Global data
GET /api/v3/global

// Coin details
GET /api/v3/coins/{id}

// Add API key as query parameter:
?x_cg_pro_api_key=your_api_key
```

### 6. Rate Limiting

**Important:** Most APIs have rate limits:
- CoinMarketCap Basic: 333 calls/day
- CoinGecko Free: 10-50 calls/minute
- Implement caching and request throttling

### 7. Error Handling

Add proper error handling for:
- API key validation
- Rate limit exceeded
- Network failures
- Invalid responses

### 8. CORS Issues

If you encounter CORS issues:
1. Use a backend proxy
2. Use server-side API calls
3. Consider using API providers with CORS support

## 📁 Files to Modify

1. **src/services/demoDataService.js** - Replace with real API service
2. **src/App.js** - Update imports and API calls
3. **src/data/demoData.js** - Remove this file (not needed with real API)

## 🚀 Testing Your Integration

1. Add your API key
2. Run `npm start`
3. Check browser console for API responses
4. Verify data appears correctly in the UI

## 📞 Support

For API-specific issues:
- CoinMarketCap: https://coinmarketcap.com/api/documentation/
- CoinGecko: https://www.coingecko.com/en/api/documentation
- Binance: https://binance-docs.github.io/apidocs/

## 🛡️ Security Note

Never commit API keys to version control. Use environment variables or a secure configuration management system.

---

**Current Status:** Demo Mode - Replace with real API integration using the instructions above.
