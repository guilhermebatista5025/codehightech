import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: '#0ea5e9', // Cyberpunk blue
        secondary: '#10b981', // Success green
        accent: '#f59e0b', // Warning yellow
        danger: '#ef4444', // Error red
        surface: '#1e293b', // Editor dark
      },
    },
  },
  plugins: [],
};
export default config;
