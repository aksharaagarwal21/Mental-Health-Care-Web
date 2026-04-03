/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { 50:'#fdf4ff',100:'#fae8ff',200:'#f3d0fe',300:'#e879f9',400:'#c026d3',500:'#9333ea',600:'#7c3aed',700:'#6d28d9',800:'#5b21b6',900:'#1e1b4b' },
        surface: { dark:'#0a0a0f', card:'#12121a', border:'#1e1e2e' },
        accent: { rose:'#fb7185', amber:'#fbbf24', teal:'#2dd4bf', blue:'#60a5fa' }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        glow: { from: { boxShadow: '0 0 10px #9333ea40' }, to: { boxShadow: '0 0 30px #9333ea80' } }
      }
    }
  },
  plugins: []
}
