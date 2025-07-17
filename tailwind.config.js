module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5f259f",
        primaryLight: "#7d4ccc",
        grayLight: "#f9f9fb",
        grayDark: "#333333",
        error: "#e53e3e",
      },
      borderRadius: {
        md: "0.375rem", // 6px arrondi agréable
      },
      boxShadow: {
        sm: "0 1px 2px rgb(0 0 0 / 0.05)",
        md: "0 4px 6px rgb(0 0 0 / 0.1)",
      },
      transitionDuration: {
        DEFAULT: '300ms',
      },
    },
  },
  plugins: [],
};
