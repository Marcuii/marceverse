  /** @type {import('tailwindcss').Config} */
  import daisyui from "daisyui"

 export default {
   content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@material-tailwind/react/**/*.{js,ts,jsx,tsx}"
   ],
    theme: {
      extend: {
        animation: {
          'spin-slow': 'spin 5s linear infinite ',
          'fadein': 'fadein 1s ease-in-out forwards',
          'slideup': 'slideup 1s ease-in-out forwards',
          'float': 'float 4s ease-in-out infinite',
          'floatreverse': 'floatreverse 4s ease-in-out infinite'
        },
        keyframes: {
          fadein: {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 },
          },
          slideup: {
            '0%': { transform: 'translateY(0)' },
            '100%': { transform: 'translateY(-120vh)' },
          },
          float: {
            "0%": { transform: 'translateY(0px)' },
            "100%": { transform: 'translateY(0px)' },
            "50%": { transform: 'translateY(-15px)' }
          },

          floatreverse: {
            "0%": { transform: 'translateY(0px)' },
            "100%": { transform: 'translateY(0px)' },
            "50%": { transform: 'translateY(15px)' }
          }

        },
      },
    },
    plugins: [
      daisyui,
    ],
    daisyui: {
      themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
      ]
    }
  }