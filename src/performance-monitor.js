// Performance Monitoring Utility for CryptoWeb
// Helps optimize component rendering and API efficiency

class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.renderCounts = new Map();
    this.apiCalls = new Map();
  }

  // Monitor component render performance
  measureRender(componentName, callback) {
    const startTime = performance.now();
    
    const result = callback();
    
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    this.recordMetric('render', componentName, duration);
    this.incrementRenderCount(componentName);
    
    // Log slow renders (>16ms for 60fps)
    if (duration > 16) {
      console.warn(`Slow render detected: ${componentName} took ${duration.toFixed(2)}ms`);
    }
    
    return result;
  }

  // Monitor API call performance
  async measureApiCall(apiName, apiCall) {
    const startTime = performance.now();
    
    try {
      const result = await apiCall();
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      this.recordMetric('api', apiName, duration);
      this.recordApiCall(apiName, 'success', duration);
      
      // Log slow API calls
      if (duration > 3000) {
        console.warn(`Slow API call: ${apiName} took ${duration.toFixed(2)}ms`);
      }
      
      return result;
    } catch (error) {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      this.recordApiCall(apiName, 'error', duration);
      throw error;
    }
  }

  // Record metric
  recordMetric(type, name, duration) {
    const key = `${type}-${name}`;
    if (!this.metrics.has(key)) {
      this.metrics.set(key, []);
    }
    this.metrics.get(key).push(duration);
  }

  // Track render counts
  incrementRenderCount(componentName) {
    const count = this.renderCounts.get(componentName) || 0;
    this.renderCounts.set(componentName, count + 1);
    
    // Warn about excessive re-renders
    if (count > 0 && count % 10 === 0) {
      console.warn(`High render count: ${componentName} has rendered ${count} times`);
    }
  }

  // Track API calls
  recordApiCall(apiName, status, duration) {
    const key = `${apiName}-${status}`;
    if (!this.apiCalls.has(key)) {
      this.apiCalls.set(key, { count: 0, totalDuration: 0 });
    }
    
    const stats = this.apiCalls.get(key);
    stats.count++;
    stats.totalDuration += duration;
    
    this.apiCalls.set(key, stats);
  }

  // Get performance report
  getReport() {
    const report = {
      renders: {},
      apis: {},
      renderCounts: Object.fromEntries(this.renderCounts),
      summary: this.getSummary()
    };

    // Process render metrics
    for (const [key, durations] of this.metrics) {
      if (key.startsWith('render-')) {
        const componentName = key.replace('render-', '');
        report.renders[componentName] = this.calculateStats(durations);
      }
    }

    // Process API metrics
    for (const [key, durations] of this.metrics) {
      if (key.startsWith('api-')) {
        const apiName = key.replace('api-', '');
        report.apis[apiName] = this.calculateStats(durations);
      }
    }

    return report;
  }

  // Calculate statistics for an array of durations
  calculateStats(durations) {
    if (durations.length === 0) return null;
    
    const sorted = [...durations].sort((a, b) => a - b);
    const sum = durations.reduce((a, b) => a + b, 0);
    
    return {
      count: durations.length,
      min: Math.min(...durations),
      max: Math.max(...durations),
      avg: sum / durations.length,
      median: sorted[Math.floor(sorted.length / 2)],
      p95: sorted[Math.floor(sorted.length * 0.95)]
    };
  }

  // Get performance summary
  getSummary() {
    const totalRenders = Array.from(this.renderCounts.values()).reduce((a, b) => a + b, 0);
    const totalApiCalls = Array.from(this.apiCalls.values()).reduce((total, stats) => total + stats.count, 0);
    
    return {
      totalRenders,
      totalApiCalls,
      componentsTracked: this.renderCounts.size,
      apisTracked: new Set(Array.from(this.apiCalls.keys()).map(key => key.split('-')[0])).size
    };
  }

  // Clear all metrics
  clear() {
    this.metrics.clear();
    this.renderCounts.clear();
    this.apiCalls.clear();
  }

  // Log performance report to console
  logReport() {
    const report = this.getReport();
    console.group('🚀 CryptoWeb Performance Report');
    
    console.group('📊 Summary');
    console.table(report.summary);
    console.groupEnd();
    
    if (Object.keys(report.renders).length > 0) {
      console.group('🎨 Component Renders');
      console.table(report.renders);
      console.groupEnd();
    }
    
    if (Object.keys(report.apis).length > 0) {
      console.group('🌐 API Calls');
      console.table(report.apis);
      console.groupEnd();
    }
    
    if (Object.keys(report.renderCounts).length > 0) {
      console.group('🔄 Render Counts');
      console.table(report.renderCounts);
      console.groupEnd();
    }
    
    console.groupEnd();
  }
}

// Create global instance
const perfMonitor = new PerformanceMonitor();

// Export for use in components
export default perfMonitor;

// Helper hooks for React components
export const usePerformanceMonitor = () => {
  return {
    measureRender: perfMonitor.measureRender.bind(perfMonitor),
    measureApiCall: perfMonitor.measureApiCall.bind(perfMonitor),
    getReport: perfMonitor.getReport.bind(perfMonitor),
    logReport: perfMonitor.logReport.bind(perfMonitor)
  };
};

// Memory usage monitor
export const monitorMemory = () => {
  if (performance.memory) {
    const memory = performance.memory;
    console.log('💾 Memory Usage:', {
      used: `${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
      total: `${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
      limit: `${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`,
      usage: `${((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100).toFixed(2)}%`
    });
  }
};

// Auto-log performance report every 30 seconds in development
if (process.env.NODE_ENV === 'development') {
  setInterval(() => {
    perfMonitor.logReport();
    monitorMemory();
  }, 30000);
}