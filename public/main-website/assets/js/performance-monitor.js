// Performance monitoring script for the main website
(function () {
  'use strict';

  // Performance monitoring
  const performanceMonitor = {
    init() {
      this.startTime = performance.now();
      this.metrics = {
        domContentLoaded: 0,
        windowLoaded: 0,
        firstPaint: 0,
        firstContentfulPaint: 0,
        largestContentfulPaint: 0,
      };

      this.setupListeners();
      this.observePerformance();
    },

    setupListeners() {
      // DOM Content Loaded
      document.addEventListener('DOMContentLoaded', () => {
        this.metrics.domContentLoaded = performance.now() - this.startTime;
        console.log('DOM Content Loaded:', this.metrics.domContentLoaded.toFixed(2), 'ms');
      });

      // Window Loaded
      window.addEventListener('load', () => {
        this.metrics.windowLoaded = performance.now() - this.startTime;
        console.log('Window Loaded:', this.metrics.windowLoaded.toFixed(2), 'ms');

        // Hide preloader after window load
        setTimeout(() => {
          const preloader = document.querySelector('.preloader');
          if (preloader) {
            preloader.style.display = 'none';
          }
        }, 500);
      });
    },

    observePerformance() {
      // Observe paint timing
      if ('PerformanceObserver' in window) {
        const paintObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-paint') {
              this.metrics.firstPaint = entry.startTime;
              console.log('First Paint:', this.metrics.firstPaint.toFixed(2), 'ms');
            }
            if (entry.name === 'first-contentful-paint') {
              this.metrics.firstContentfulPaint = entry.startTime;
              console.log('First Contentful Paint:', this.metrics.firstContentfulPaint.toFixed(2), 'ms');
            }
          }
        });

        paintObserver.observe({ entryTypes: ['paint'] });

        // Observe largest contentful paint
        const lcpObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            this.metrics.largestContentfulPaint = entry.startTime;
            console.log('Largest Contentful Paint:', this.metrics.largestContentfulPaint.toFixed(2), 'ms');
          }
        });

        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      }
    },

    // Get performance metrics
    getMetrics() {
      return this.metrics;
    },

    // Log performance report
    logReport() {
      console.group('Performance Report');
      console.log('DOM Content Loaded:', this.metrics.domContentLoaded.toFixed(2), 'ms');
      console.log('Window Loaded:', this.metrics.windowLoaded.toFixed(2), 'ms');
      console.log('First Paint:', this.metrics.firstPaint.toFixed(2), 'ms');
      console.log('First Contentful Paint:', this.metrics.firstContentfulPaint.toFixed(2), 'ms');
      console.log('Largest Contentful Paint:', this.metrics.largestContentfulPaint.toFixed(2), 'ms');
      console.groupEnd();
    },
  };

  // Initialize performance monitoring
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      performanceMonitor.init();
    });
  } else {
    performanceMonitor.init();
  }

  // Expose to window for debugging
  window.performanceMonitor = performanceMonitor;

  // Log report after 5 seconds
  setTimeout(() => {
    performanceMonitor.logReport();
  }, 5000);
})();
