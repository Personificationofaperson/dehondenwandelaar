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
        ink: "#2B2520",
        muted: "#6B5F54",
        sand: "#F6F1EA",
        // warm oranje. 'accent' haalt contrast met witte tekst (5,4:1),
        // 'bright' is alleen voor vlakken en iconen, nooit voor tekst.
        accent: {
          DEFAULT: "#B54622",
          bright: "#E2673C",
          soft: "#FBE9E1",
          line: "#EFCDBD",
        },
        moss: {
          DEFAULT: "#355B47",
          deep: "#2A4A39",
          soft: "#E4EFE8",
          text: "#C9E3D4",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: { card: "1.75rem", blob: "12rem 12rem 2.5rem 12rem", pill: "9999px" },
      boxShadow: {
        soft: "0 2px 10px rgba(43,37,32,.06)",
        lift: "0 14px 34px -22px rgba(43,37,32,.5)",
        deep: "0 30px 60px -30px rgba(43,37,32,.45)",
      },
      maxWidth: { shell: "74rem" },
    },
  },
  plugins: [],
}
