/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF6363",
        secondary: {
          100: "#E2E2D5",
          200: "#888883",
        },
        fontFamily: {
          body: ["Nunito"],
        },
      },
      animation: {
        text: "text 5s ease infinite",
      },
      keyframes: {
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
      width: {
        '80%': '80%',
      },
      minWidth:{
        '128': '24rem'
      },
      maxWidth:{
        '50 vw': '150%'
      },
      height: {
        'vh-28': '28rem',
        'vh-20': '20rem'
      },
    },
    ripple: (theme) => ({
      colors: theme("colors"),
    }),
  },
  plugins: [require("flowbite/plugin"), require("tailwindcss-ripple")(), require('tailwind-scrollbar')],
};
