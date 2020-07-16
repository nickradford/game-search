module.exports = {
  theme: {
    fontFamily: {
      asap: ["Asap", "sans-serif"],
    },
    typography: {
      default: {
        css: {
          color: "#fff",
          h3: {
            color: "#fff",
          },
          h1: {
            color: "#fff",
          },
        },
      },
    },
  },
  variants: {
    margin: ["responsive", "last"],
  },
  plugins: [require("@tailwindcss/typography")],
};
