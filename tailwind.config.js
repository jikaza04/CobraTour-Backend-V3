/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px', 
        '2xl': '1536px', 
        '3xl': '1920px',
      },
      backgroundColor:{
        'admin-navgray': '#E9E9E9',
        'admin-hovergray': '#C3C3C3',
        'maroon-custom': '#900710',
        'grey-custom':'#D9D9D9',
        'dark-gray': '#231F20',
        'light-maroon': '#D1565E',
        'modal': 'rgba(0, 0, 0, 0.5)',
        'bg-gray-v2': '#333333',
        'home':'rgba(51, 51, 51, 0.49)',
      },
      borderColor:{
        'admin-navgray': '#E9E9E9',
        'admin-hovergray': '#C3C3C3',
        'maroon-custom': '#900710',
        'light-maroon': '#D1565E',
        'control-border': '#CEC1C1',
      },
      textColor:{
        'admin-navgray': '#E9E9E9',
        'admin-hovergray': '#C3C3C3',
        'maroon-custom': '#900710',
        'light-maroon': '#D1565E',
      },
      width:{
        'w-nav': '98vw',
        'w-90vw': '90vw',
        'iso': '300px',
      },
      height:{
        'sm':'600px',
        'md':'800px',
        'iso': '350px',
        'v-modal': '95%',
      },
      fill:{
        'light-maroon': '#D1565E',
      },
      blur:{
        'extreme': '150px',
        'home': 'blur(24.899999618530273px)',
      },
      boxShadow:{
        'box-sec':"0px 4px 10px 0px rgba(0, 0, 0, 0.25);",
      }
    },
  },
  plugins: [],
}

