/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#F7F4F0',
        surface: '#FCFAF7',
        champagne: '#E7DEC8',
        sand: '#D5C4B1',
        taupe: '#BBAA9B',
        greige: '#887B70',
        cocoa: '#553C2E',
        espresso: '#1A1410',
        bronze: '#976E55',
        gold: {
          light: '#F3E8D3',
          DEFAULT: '#CBB282',
          dark: '#A68953',
          warm: '#D6B480',
        },
        borderline: '#E5DED5',
        'borderline-gold': '#D9C4A5',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Bodoni Moda"', 'Georgia', 'serif'],
        display: ['"Bodoni Moda"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontSize: {
        '3xs': ['9.5px', '12px'],
        '2xs': ['11px', '14px'],
        'xs': ['12px', '16px'],
        'sm': ['13.5px', '19px'],
        'base': ['15px', '1.65'],
        'lg': ['17.5px', '1.5'],
        'xl': ['20px', '1.35'],
        '2xl': ['25px', '1.25'],
        '3xl': ['32px', '1.18'],
        '4xl': ['40px', '1.12'],
        '5xl': ['52px', '1.08'],
        '6xl': ['66px', '1.04'],
        '7xl': ['84px', '0.98'],
      },
      letterSpacing: {
        'editorial-tight': '-0.02em',
        'editorial': '0.14em',
        'editorial-wide': '0.22em',
      },
      maxWidth: {
        'luxury': '1180px',
      },
      boxShadow: {
        'luxury-subtle': '0 2px 8px rgba(26, 20, 16, 0.03), 0 10px 24px rgba(26, 20, 16, 0.03)',
        'luxury-card': '0 4px 16px rgba(26, 20, 16, 0.04), 0 16px 40px rgba(26, 20, 16, 0.05)',
        'luxury-gold': '0 4px 20px rgba(203, 178, 130, 0.18)',
        'luxury-hover': '0 8px 30px rgba(26, 20, 16, 0.08)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #E6D5B8 0%, #CBB282 50%, #A68953 100%)',
        'gold-soft': 'linear-gradient(135deg, #FCFAF7 0%, #F5EFE6 100%)',
        'dark-gradient': 'linear-gradient(145deg, #241A14 0%, #150F0B 100%)',
      },
    },
  },
  plugins: [],
}
