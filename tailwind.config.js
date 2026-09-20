/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#22323D",
        muted: "#51707F",
        cream: "#F4F2EC",
        brand: {
          50: "#F0F7FC",
          100: "#DCEDFA",
          200: "#B6D8F2",
          300: "#8FBFE2",
          500: "#5C86A3",
          700: "#3A5A70",
          800: "#2C4759",
          900: "#1F3B4D",
        },
        clay: {
          100: "#FBEDE7",
          300: "#EFB89F",
          500: "#D9734E",
          700: "#A84A30",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "1.5rem",
        pill: "9999px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(31,59,77,.05), 0 8px 24px -12px rgba(31,59,77,.18)",
        lift: "0 2px 4px rgba(31,59,77,.06), 0 18px 40px -18px rgba(31,59,77,.28)",
        focus: "0 0 0 3px rgba(182,216,242,.9)",
      },
      maxWidth: { shell: "78rem" },
    },
  },
  plugins: [],
}
