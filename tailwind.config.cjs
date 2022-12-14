/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addBase, theme }) {
      function extractColorVars(colorObj, colorGroup = "") {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey];

          const newVars =
            typeof value === "string"
              ? { [`--color${colorGroup}-${colorKey}`]: value }
              : extractColorVars(value, `-${colorKey}`);

          return { ...vars, ...newVars };
        }, {});
      }

      addBase({
        ":root": extractColorVars(theme("colors")),
      });
    },
  ],
  safelist: [
    "bg-red-500",
    "border-red-500",
    "bg-yellow-500",
    "border-yellow-500",
    "bg-lime-500",
    "border-lime-500",
    "bg-blue-500",
    "border-blue-500",
    "bg-purple-500",
    "border-purple-500",
    "bg-pink-500",
    "border-pink-500",
    "bg-orange-500",
    "border-orange-500",
    "bg-emerald-500",
    "border-emerald-500",
    "bg-cyan-500",
    "border-cyan-500",
    "bg-fuchsia-500",
    "border-fuchsia-500",
  ],
};
