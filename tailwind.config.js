/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef9f3',
          100: '#fdf2e7',
          200: '#fbe3c2',
          300: '#f8d09d',
          400: '#f4b773',
          500: '#f0a04b',
          600: '#eb8f2f',
          700: '#d6791f',
          800: '#b5661a',
          900: '#935516',
        },
        dark: {
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#818181',
          500: '#666666',
          600: '#515151',
          700: '#434343',
          800: '#383838',
          900: '#1a1a1a',
          950: '#0a0a0a',
        },
        neon: {
          orange: '#ff6b35',
          amber: '#ffa726',
          yellow: '#ffeb3b',
        }
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 25%, #2a2a2a 50%, #f0a04b 100%)',
        'card-gradient': 'linear-gradient(145deg, rgba(26, 26, 26, 0.9) 0%, rgba(45, 45, 45, 0.7) 100%)',
        'orange-glow': 'radial-gradient(circle at 30% 20%, #f0a04b 0%, transparent 50%), linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
        'mesh-gradient': 'radial-gradient(at 40% 20%, #f0a04b 0px, transparent 50%), radial-gradient(at 80% 0%, #eb8f2f 0px, transparent 50%), radial-gradient(at 0% 50%, #1a1a1a 0px, transparent 50%), radial-gradient(at 80% 50%, #0a0a0a 0px, transparent 50%)',
        'cyber-grid': 'linear-gradient(rgba(240, 160, 75, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(240, 160, 75, 0.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        'cyber-grid': '3rem 3rem',
      },
      animation: {
        'slide-up': 'slide-up 0.4s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'bar-reveal': 'scale-in 1s ease-out forwards', // Simplified to scale-in
      },
      keyframes: {
        'glow-pulse': {
          '0%': { boxShadow: '0 0 5px #f0a04b, 0 0 10px #f0a04b, 0 0 15px #f0a04b' },
          '100%': { boxShadow: '0 0 10px #f0a04b, 0 0 20px #f0a04b, 0 0 30px #f0a04b' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'bar-reveal': {
          '0%': { transform: 'scaleX(0)', opacity: '0' },
          '20%': { transform: 'scaleX(1)', opacity: '1' },
          '80%': { transform: 'scaleX(1)', opacity: '1' },
          '100%': { transform: 'scaleX(1)', opacity: '0' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'neon': '0 0 5px #f0a04b, 0 0 20px #f0a04b, 0 0 35px #f0a04b',
        'neon-sm': '0 0 2px #f0a04b, 0 0 8px #f0a04b, 0 0 16px #f0a04b',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
    },
  },
  plugins: [],
}