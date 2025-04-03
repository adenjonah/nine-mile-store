/**
 * Theme configuration for Nine Mile Store
 * A centralized place to manage colors, fonts, and other design elements
 */

const theme = {
  colors: {
    // Primary brand colors - blue accents
    primary: {
      light: '#60a5fa',
      main: '#3b82f6', 
      dark: '#2563eb',
      contrast: '#000000',
    },
    // Secondary/accent colors (refined for better contrast)
    secondary: {
      light: '#f59e0b', // Light amber
      main: '#d97706',  // Main amber
      dark: '#b45309',  // Dark amber
      contrast: '#ffffff', // White text on secondary
    },
    // Background colors - clean white
    background: {
      light: '#ffffff',
      main: '#ffffff',
      dark: '#ffffff',
      alternate: '#f8fafc',
    },
    // Text colors - all black
    text: {
      primary: '#000000',
      secondary: '#000000',
      disabled: '#000000',
      inverse: '#000000',
    },
    // Status colors
    status: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    // Sale colors (better contrast)
    sale: {
      regular: '#64748b', // Medium slate for price before discount
      discount: '#dc2626', // Bright red for sale price
    }
  },
  
  // Font settings
  typography: {
    fontFamily: {
      sans: 'var(--font-geist-sans), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: 'var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
    },
  },
  
  // Border radius
  borderRadius: {
    sm: '0.25rem',   // 4px
    md: '0.375rem',  // 6px
    lg: '0.5rem',    // 8px
    xl: '0.75rem',   // 12px
    '2xl': '1rem',   // 16px
    full: '9999px',  // Full rounded (circle)
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
  
  // Spacing
  spacing: {
    xs: '0.5rem',   // 8px
    sm: '0.75rem',  // 12px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2rem',     // 32px
    '2xl': '2.5rem', // 40px
    '3xl': '3rem',   // 48px
  },
};

export default theme; 