/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/*.html'],
  theme: {
    extend: {
      backgroundColor:{
        'white':"#ffffff",
        'background-card': '#4E2096',
        'cancel-button':'#DFE4E8'
      },
      colors: {
        'main': '#4E2096',           
        'text-primary': '#26203B',   
        'text-secondary': '#4D4E4E', 
        'stroke': '#DFE4E8',          
        'placeholder': '#B2B2B2',    
        'danger': '#E03131',         
        'success': '#08D58B',     
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'xs': '12px', 
        'sm': '14px', 
        'base': '16px', 
        'lg': '24px',
        'xl': '32px', 
        '2xl': '40px', 
      },
      fontWeight: {
        'regular': '400',
        'medium': '500',
        'semibold': '600',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

