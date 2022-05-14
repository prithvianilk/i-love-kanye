module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        scoop: "#252525",
        "scoop-hover": "#191919",
      },
      spacing: {
        '5/6': "83.33334%"
      }
    },
  },
  plugins: [],
};
