/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
     
      colors: {
        clifford: '#da373d',
        ck: '#da373d',
        primary: '#0A9FDA',
        nav:'#7A7A7A',
        header:'#FFFFFF',
        light: '#82828A',
        about: '#F8F8F8',
        footer: '#292929',
        hero: '#6C6857',
        hero1: '#F1F0EF',
        newBg:'#242E2C',
        hello:'rgba(10, 159, 218, .8)',
        p1:'rgba(10, 159, 218, .7)',
        p2:'rgba(10, 159, 218, .8)',
        p3:'rgba(10, 159, 218, .3)',
        card:'#D1D0CE',
        b1:'rgba(10, 159, 218, .3)',
        projects:'#F8F8F8',
        services: '#F8F8F8',
        

      },
      fontFamily: {
                'sans': ['ui-sans-serif', 'system-ui'],
                'serif': ['ui-serif', 'Georgia'],
                'mono': ['ui-monospace', 'SFMono-Regular'],
                'display': ['Oswald'],
                'body': ['"Open Sans"',],
                'manrope' : ['Manrope', 'sans-serif'],
                'roboto' : ['Roboto', 'sans-serif'],
               
            },

    }
    
  },
  plugins: [require('daisyui')]
}