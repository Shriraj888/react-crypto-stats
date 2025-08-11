// ========================================
// 🔑 DEMO DATA - REPLACE WITH REAL API
// ========================================
// This file contains static demo data for presentation purposes.
// 
// TO INTEGRATE REAL API DATA:
// 1. Remove this entire file
// 2. Update your service to fetch real data from:
//    - CoinMarketCap API
//    - CoinGecko API  
//    - Binance API
//    - Or your preferred crypto data provider
//
// 3. Ensure your API responses match this data structure:
//    - id: unique identifier
//    - name: full cryptocurrency name
//    - symbol: trading symbol (BTC, ETH, etc.)
//    - cmc_rank: market cap ranking
//    - image: logo URL
//    - quote.USD.price: current price in USD
//    - quote.USD.percent_change_24h: 24h percentage change
//    - quote.USD.market_cap: market capitalization
//    - quote.USD.volume_24h: 24h trading volume
//    - circulating_supply: circulating supply amount
// ========================================

// Demo cryptocurrency data
export const demoCryptoData = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    cmc_rank: 1,
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    quote: {
      USD: {
        price: 67543.21,
        percent_change_24h: 2.45,
        percent_change_7d: 8.12,
        market_cap: 1336789543210,
        volume_24h: 28765432109
      }
    },
    circulating_supply: 19789543
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    cmc_rank: 2,
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    quote: {
      USD: {
        price: 3456.78,
        percent_change_24h: -1.23,
        percent_change_7d: 12.34,
        market_cap: 415678901234,
        volume_24h: 15432109876
      }
    },
    circulating_supply: 120345678
  },
  {
    id: "tether",
    name: "Tether USDt",
    symbol: "USDT",
    cmc_rank: 3,
    image: "https://assets.coingecko.com/coins/images/325/large/Tether.png",
    quote: {
      USD: {
        price: 1.0001,
        percent_change_24h: 0.01,
        percent_change_7d: -0.02,
        market_cap: 119876543210,
        volume_24h: 45678901234
      }
    },
    circulating_supply: 119876543210
  },
  {
    id: "bnb",
    name: "BNB",
    symbol: "BNB",
    cmc_rank: 4,
    image: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
    quote: {
      USD: {
        price: 634.12,
        percent_change_24h: 3.78,
        percent_change_7d: 15.67,
        market_cap: 91234567890,
        volume_24h: 1876543210
      }
    },
    circulating_supply: 143876549
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    cmc_rank: 5,
    image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    quote: {
      USD: {
        price: 189.45,
        percent_change_24h: 5.23,
        percent_change_7d: 18.45,
        market_cap: 89876543210,
        volume_24h: 3456789012
      }
    },
    circulating_supply: 474567890
  },
  {
    id: "usdc",
    name: "USDC",
    symbol: "USDC",
    cmc_rank: 6,
    image: "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png",
    quote: {
      USD: {
        price: 0.9999,
        percent_change_24h: -0.01,
        percent_change_7d: 0.02,
        market_cap: 33456789012,
        volume_24h: 6789012345
      }
    },
    circulating_supply: 33456789012
  },
  {
    id: "xrp",
    name: "XRP",
    symbol: "XRP",
    cmc_rank: 7,
    image: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png",
    quote: {
      USD: {
        price: 0.6234,
        percent_change_24h: -2.45,
        percent_change_7d: 7.89,
        market_cap: 35678901234,
        volume_24h: 1234567890
      }
    },
    circulating_supply: 57234567890
  },
  {
    id: "dogecoin",
    name: "Dogecoin",
    symbol: "DOGE",
    cmc_rank: 8,
    image: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png",
    quote: {
      USD: {
        price: 0.1234,
        percent_change_24h: 4.56,
        percent_change_7d: -3.21,
        market_cap: 18234567890,
        volume_24h: 987654321
      }
    },
    circulating_supply: 147876543210
  },
  {
    id: "toncoin",
    name: "Toncoin",
    symbol: "TON",
    cmc_rank: 9,
    image: "https://assets.coingecko.com/coins/images/17980/large/ton_symbol.png",
    quote: {
      USD: {
        price: 5.67,
        percent_change_24h: 1.89,
        percent_change_7d: 11.23,
        market_cap: 14567890123,
        volume_24h: 234567890
      }
    },
    circulating_supply: 2567890123
  },
  {
    id: "cardano",
    name: "Cardano",
    symbol: "ADA",
    cmc_rank: 10,
    image: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
    quote: {
      USD: {
        price: 0.4567,
        percent_change_24h: -1.78,
        percent_change_7d: 9.45,
        market_cap: 16789012345,
        volume_24h: 345678901
      }
    },
    circulating_supply: 36789012345
  },
  {
    id: "shiba-inu",
    name: "Shiba Inu",
    symbol: "SHIB",
    cmc_rank: 11,
    image: "https://assets.coingecko.com/coins/images/11939/large/shiba.png",
    quote: {
      USD: {
        price: 0.00002456,
        percent_change_24h: 7.89,
        percent_change_7d: -5.67,
        market_cap: 14567890123,
        volume_24h: 567890123
      }
    },
    circulating_supply: 589678901234567
  },
  {
    id: "avalanche-2",
    name: "Avalanche",
    symbol: "AVAX",
    cmc_rank: 12,
    image: "https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png",
    quote: {
      USD: {
        price: 34.56,
        percent_change_24h: 3.45,
        percent_change_7d: 14.67,
        market_cap: 13789012345,
        volume_24h: 456789012
      }
    },
    circulating_supply: 398765432
  },
  {
    id: "chainlink",
    name: "Chainlink",
    symbol: "LINK",
    cmc_rank: 13,
    image: "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png",
    quote: {
      USD: {
        price: 14.67,
        percent_change_24h: -0.89,
        percent_change_7d: 6.78,
        market_cap: 8765432109,
        volume_24h: 234567890
      }
    },
    circulating_supply: 597654321
  },
  {
    id: "bitcoin-cash",
    name: "Bitcoin Cash",
    symbol: "BCH",
    cmc_rank: 14,
    image: "https://assets.coingecko.com/coins/images/780/large/bitcoin-cash-circle.png",
    quote: {
      USD: {
        price: 456.78,
        percent_change_24h: 2.34,
        percent_change_7d: -4.56,
        market_cap: 9012345678,
        volume_24h: 345678901
      }
    },
    circulating_supply: 19734567
  },
  {
    id: "polkadot",
    name: "Polkadot",
    symbol: "DOT",
    cmc_rank: 15,
    image: "https://assets.coingecko.com/coins/images/12171/large/polkadot.png",
    quote: {
      USD: {
        price: 6.78,
        percent_change_24h: 1.56,
        percent_change_7d: 8.90,
        market_cap: 8456789012,
        volume_24h: 123456789
      }
    },
    circulating_supply: 1246789012
  },
  {
    id: "polygon",
    name: "Polygon",
    symbol: "MATIC",
    cmc_rank: 16,
    image: "https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png",
    quote: {
      USD: {
        price: 0.5678,
        percent_change_24h: 4.23,
        percent_change_7d: -2.34,
        market_cap: 5678901234,
        volume_24h: 456789012
      }
    },
    circulating_supply: 10012345678
  },
  {
    id: "litecoin",
    name: "Litecoin",
    symbol: "LTC",
    cmc_rank: 17,
    image: "https://assets.coingecko.com/coins/images/2/large/litecoin.png",
    quote: {
      USD: {
        price: 89.12,
        percent_change_24h: -1.45,
        percent_change_7d: 5.67,
        market_cap: 6789012345,
        volume_24h: 234567890
      }
    },
    circulating_supply: 76123456
  },
  {
    id: "uniswap",
    name: "Uniswap",
    symbol: "UNI",
    cmc_rank: 18,
    image: "https://assets.coingecko.com/coins/images/12504/large/uniswap-uni.png",
    quote: {
      USD: {
        price: 8.90,
        percent_change_24h: 3.67,
        percent_change_7d: 12.34,
        market_cap: 5345678901,
        volume_24h: 123456789
      }
    },
    circulating_supply: 600789012
  },
  {
    id: "internet-computer",
    name: "Internet Computer",
    symbol: "ICP",
    cmc_rank: 19,
    image: "https://assets.coingecko.com/coins/images/14495/large/Internet_Computer_logo.png",
    quote: {
      USD: {
        price: 12.34,
        percent_change_24h: -2.78,
        percent_change_7d: 7.89,
        market_cap: 5678901234,
        volume_24h: 98765432
      }
    },
    circulating_supply: 460234567
  },
  {
    id: "ethereum-classic",
    name: "Ethereum Classic",
    symbol: "ETC",
    cmc_rank: 20,
    image: "https://assets.coingecko.com/coins/images/453/large/ethereum-classic-logo.png",
    quote: {
      USD: {
        price: 23.45,
        percent_change_24h: 1.23,
        percent_change_7d: -6.78,
        market_cap: 3456789012,
        volume_24h: 156789012
      }
    },
    circulating_supply: 147345678
  }
];

// Generate additional demo data for pagination
// 🔑 FOR REAL API: This function won't be needed with real pagination
export const generateMoreDemoData = (page) => {
  const startRank = 21 + (page - 2) * 20;
  
  return Array.from({ length: 20 }, (_, index) => {
    const rank = startRank + index;
    const price = Math.random() * 100 + 0.01;
    const change24h = (Math.random() - 0.5) * 20;
    const change7d = (Math.random() - 0.5) * 30;
    
    return {
      id: `demo-coin-${rank}`,
      name: `Demo Coin ${rank}`,
      symbol: `DC${rank}`,
      cmc_rank: rank,
      image: `https://via.placeholder.com/64/4f46e5/ffffff?text=DC${rank}`,
      quote: {
        USD: {
          price: price,
          percent_change_24h: change24h,
          percent_change_7d: change7d,
          market_cap: price * Math.random() * 1000000000,
          volume_24h: price * Math.random() * 10000000
        }
      },
      circulating_supply: Math.random() * 1000000000
    };
  });
};

// Market summary demo data
// 🔑 FOR REAL API: Replace with actual global market metrics
export const demoMarketSummary = {
  totalMarketCap: 2456789012345,
  totalVolume: 98765432109,
  btcDominance: 52.3,
  ethDominance: 17.8,
  totalCoins: 10000,
  activePairs: 89567
};
