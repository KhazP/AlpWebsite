import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#156129', // --primary-color
          hover: '#0c4e21',   // --primary-hover
          dark: '#31543f',    // --primary-dark-color (removed ff)
        },
        secondary: '#2b4332', // --secondary-color (removed ff)
        accent: {
          DEFAULT: '#1a7fbc', // --accent-color
          dark: '#188582',    // --accent-dark-color
        },
        background: {
          DEFAULT: '#020912', // --background-color (removed ff)
          alt: '#0c1726',     // --background-alt-color
        },
        card: {
          bg: '#112233',      // --card-bg-color
        },
        text: {
          primary: '#f8f9fa',       // --text-primary-color
          secondary: '#ced4da',     // --text-secondary-color
          muted: '#adb5bd',         // --text-muted-color
          'on-dark': '#ffffff',     // --text-on-dark (from critical CSS)
        },
        border: '#31543f',          // --border-color (removed ff)
        label: '#0d5523',           // --label-color
        success: '#28a745',         // --success-color
        error: '#dc3545',           // --error-color
      },
      fontFamily: {
        // Use CSS variables defined by @next/font
        heading: ['var(--font-poppins)', 'sans-serif'], // Poppins as substitute for Funnel Display
        main: ['var(--font-open-sans)', 'Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2.5rem',
        xxl: '4rem',
      },
      borderRadius: {
        sm: '0.25rem',
        md: '0.5rem',
        lg: '1rem',
      },
      height: {
        'navbar': '65px', // --navbar-height
      },
      transitionDuration: {
        fast: '0.2s',
        medium: '0.3s',
        slow: '0.5s',
      }
    },
  },
  plugins: [],
};
export default config;
