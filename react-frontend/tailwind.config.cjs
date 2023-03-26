/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "RED-GRADIENT": "linear-gradient(to right, #DC1C13, #F07470)",
        "BLUE-GRADIENT": "linear-gradient(to right, #64748B, #3F51B5)",
      },
      backgroundColor:{
        "GREEN_MAIN": "#f6f5ea",
      },
      keyframes: {
        "SCALE-IN-OUT": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        SCALER: "SCALE-IN-OUT 2s ease-in-out infinite",
      },
    },
    plugins: [require("daisyui")],
  },
};

