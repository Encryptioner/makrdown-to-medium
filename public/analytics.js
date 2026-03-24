/**
 * Google Analytics 4 Integration
 * Privacy-first analytics for Markdown to Medium tool
 */

/**
 * Google Analytics Configuration
 */
const GOOGLE_ANALYTICS_CONFIG = {
  /**
   * Your Google Analytics 4 Measurement ID
   * Get it from: https://analytics.google.com/ > Admin > Data Streams
   */
  measurementId: 'G-8TPMQ9LFT4', // Replace with your GA4 Measurement ID

  /**
   * Enable/disable Google Analytics
   * Privacy-first: disabled by default
   */
  enabled: false, // Set to true when you add your measurement ID

  /**
   * Track in development environment
   * Set to true if you want to test analytics locally
   */
  trackInDevelopment: false,

  /**
   * Determine if tracking should be active
   */
  get shouldTrack() {
    if (!this.enabled) return false;
    if (!this.measurementId || this.measurementId === 'G-XXXXXXXXXX') return false;

    // Check if running on localhost
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (isLocalhost && !this.trackInDevelopment) return false;

    return true;
  },
};

/**
 * Initialize Google Analytics
 * Call this once at app startup
 */
function initializeGA() {
  if (!GOOGLE_ANALYTICS_CONFIG.shouldTrack) {
    console.log('[Google Analytics] Tracking disabled');
    return;
  }

  try {
    // Add gtag.js script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_CONFIG.measurementId}`;
    document.head.appendChild(script);

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };

    // Configure GA
    window.gtag('js', new Date());
    window.gtag('config', GOOGLE_ANALYTICS_CONFIG.measurementId);

    console.log('[Google Analytics] Initialized successfully with ID:', GOOGLE_ANALYTICS_CONFIG.measurementId);
  } catch (error) {
    console.error('[Google Analytics] Initialization failed:', error);
  }
}

/**
 * Track a custom event
 * @param {string} eventName - Name of the event
 * @param {Object} params - Event parameters
 */
function trackEvent(eventName, params = {}) {
  if (!GOOGLE_ANALYTICS_CONFIG.shouldTrack) return;

  try {
    if (window.gtag) {
      window.gtag('event', eventName, params);
      console.log('[Google Analytics] Event tracked:', eventName, params);
    }
  } catch (error) {
    console.error('[Google Analytics] Event tracking failed:', error);
  }
}

/**
 * Track markdown conversion
 * @param {number} markdownLength - Length of markdown input
 */
function trackConversion(markdownLength) {
  trackEvent('markdown_conversion', {
    category: 'Conversion',
    markdown_length: markdownLength,
  });
}

/**
 * Track HTML copy to clipboard
 * @param {number} htmlLength - Length of HTML output
 */
function trackCopyToClipboard(htmlLength) {
  trackEvent('copy_to_clipboard', {
    category: 'User Interaction',
    html_length: htmlLength,
  });
}

/**
 * Track markdown input change
 * Used to understand user engagement
 */
function trackMarkdownInput() {
  trackEvent('markdown_input', {
    category: 'User Interaction',
  });
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeGA);
} else {
  initializeGA();
}

// Make tracking functions globally available for React components
window.trackConversion = trackConversion;
window.trackCopyToClipboard = trackCopyToClipboard;
window.trackMarkdownInput = trackMarkdownInput;
