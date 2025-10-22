# Google Analytics Setup

This project includes Google Analytics 4 (GA4) integration for tracking user interactions.

## Setup Instructions

1. **Get your GA4 Measurement ID**
   - Go to [Google Analytics](https://analytics.google.com/)
   - Navigate to Admin > Data Streams
   - Create a new data stream or use an existing one
   - Copy your Measurement ID (format: `G-XXXXXXXXXX`)

2. **Configure Analytics**
   - Open `public/analytics.js`
   - Replace `'G-XXXXXXXXXX'` with your actual Measurement ID on line 14
   - Set `enabled: true` on line 20 to activate tracking

3. **Deploy**
   - Build and deploy your app normally
   - Analytics will automatically start tracking once enabled

## Tracked Events

The following events are automatically tracked:

- **Page Views**: Automatically tracked by GA4
- **Copy to Clipboard**: Tracks when users copy the converted HTML
  - Event name: `copy_to_clipboard`
  - Parameters: `html_length`

## Privacy Features

- **Disabled by default**: Analytics must be explicitly enabled
- **No localhost tracking**: By default, analytics won't track on localhost
- **Test mode**: Set `trackInDevelopment: true` in `public/analytics.js` to test locally

## Custom Event Tracking

Three tracking functions are available globally:

```javascript
// Track markdown conversion
window.trackConversion(markdownLength);

// Track copy to clipboard (already implemented)
window.trackCopyToClipboard(htmlLength);

// Track markdown input
window.trackMarkdownInput();
```

Add these calls anywhere in your React components to track additional user interactions.

## Verifying Analytics

1. Enable analytics in `public/analytics.js`
2. Run your app: `pnpm start`
3. Check browser console for: `[Google Analytics] Initialized successfully`
4. View real-time data in Google Analytics dashboard

## Troubleshooting

- Ensure your Measurement ID is correct
- Check that `enabled: true` is set
- Verify the console shows successful initialization
- Check for any ad blockers that might interfere
