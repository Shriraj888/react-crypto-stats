# 🚀 CryptoWeb - Cryptocurrency Analytics Platform

<div align="center">

![React](https://img.shields.io/badge/React-19.1-61DAFB?style=flat-square&logo=react)
![Demo Mode](https://img.shields.io/badge/Status-Demo_Mode-orange?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

**Professional cryptocurrency tracking platform with modern UI design**

[🔑 API Integration Guide](./API_INTEGRATION.md) • [🐛 Report Issues](https://github.com/Shriraj888/react-crypto-stats/issues)

</div>

## ⚠️ Current Status: Demo Mode

This application is currently running with **simulated cryptocurrency data** for demonstration purposes.

## 🚨 Important Notice About Live Demo

**This GitHub repository does NOT include real API integration.** However, if you find a live demo link elsewhere that shows real-time cryptocurrency data, that means:

- The live demo is hosted separately with its own API keys
- The demo site has integrated real cryptocurrency APIs (CoinMarketCap, CoinGecko, etc.)
- **THIS repository contains only demo/simulated data**

**To get real-time data in YOUR copy of this project:**
1. You must obtain your own API key from a cryptocurrency data provider
2. Follow the [API Integration Guide](./API_INTEGRATION.md) in this repository
3. Replace the demo data service with actual API calls using your API key

**No API keys are included in this repository for security reasons.**

## ⚡ Key Features

- 📊 **Demo data simulation** with realistic cryptocurrency movements
- 🎨 **Modern UI** with glassmorphism design
- ⚡ **Optimized performance** with lazy loading and code splitting
- 📱 **Fully responsive** across all devices
- 🔧 **Easy API integration** - follow our guide to connect real data

## 🛠️ Tech Stack

**Frontend:** React 19.1, CSS3, Glassmorphism  
**Demo Data:** Static simulation service  
**Animation:** GSAP 3.13  
**Icons:** Lucide React  
**Build:** Create React App  

## 🚀 Quick Start

```bash
# Clone and install
git clone https://github.com/Shriraj888/react-crypto-stats.git
cd react-crypto-stats
npm install

# Run demo version (with simulated data)
npm start

# Production build
npm run build
```

## 🔑 Integrate Real API Data

To switch from demo data to real cryptocurrency APIs:

1. **Read the [API Integration Guide](./API_INTEGRATION.md)**
2. **Choose your API provider** (CoinMarketCap, CoinGecko, etc.)
3. **Get your API key**
4. **Follow the code modification instructions**

**Supported APIs:**
- CoinMarketCap Pro API
- CoinGecko Pro API  
- Binance API
- CryptoCompare API

## 📁 Architecture

```
src/
├── components/          # UI components
│   ├── Hero.js         # Landing section
│   ├── CryptoGrid.js   # Data display
│   └── Contact.js      # Contact form
├── services/           # Data services
│   └── demoDataService.js  # 🔑 Replace with real API
├── data/               # Demo data
│   └── demoData.js     # 🔑 Remove when using real API
├── utils/              # Utilities
│   └── performance.js  # Performance monitoring
└── App.js             # Main app with API comments
```

## 🔧 API Integration Points

The following files contain detailed comments for API integration:

- `src/App.js` - Main data fetching logic
- `src/services/demoDataService.js` - Service layer (replace this)
- `src/data/demoData.js` - Demo data (remove when using real API)

## 📊 Demo vs Real Data

| Feature | This Repository | Live Demo (if exists) |
|---------|-----------------|----------------------|
| Data Source | Static simulation | Live API feeds |
| Update Frequency | Simulated | Real-time |
| Data Accuracy | Demo purposes | Market accurate |
| API Keys Required | No | Yes (their own) |
| API Costs | Free | Varies by provider |

## 🚀 Deployment

**Quick Deploy:**
- **Vercel:** `npm run build` → Connect GitHub repo
- **Netlify:** Build command: `npm run build`, Publish dir: `build`

**Important:** Add your API keys to environment variables in production!

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit pull request

## 📞 Contact

**Developer:** [Shriraj888]  
**Project:** [react-crypto-stats](https://github.com/Shriraj888/react-crypto-stats)

---

<div align="center">

**⭐ Star this repo • 🔑 [Integrate Real APIs](./API_INTEGRATION.md) • 🚀 Deploy Your Own**

</div>
