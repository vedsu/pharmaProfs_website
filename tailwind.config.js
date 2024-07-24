/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: {
            100: "#f5f5f7",
            200: "#faf9f6",
            500: "#ececec",
            900: "#e4e4e4",
          },
          bg: {
            mintCream: "#e8f3f0",
            teal: "#007c7c",
            lightTeal: "#4ba2a2",
            lightCyan: "#c6e9e0",
            obsidianBlack: "#0b1215",
          },
          pText: "#212427",
          pTextLight: "#faf9f6",
          pLabel: "#333333",
          pSlateGray: "#444",
          pTextTeal: "#007c7c",
          asterisk: "#ff5773",
          error: "#ef5330",
        },
        secondary: {
          sText: "#919191",
          sLabel: "#f0f0f0",
          bg: {
            lightGray: "#d3d3d3",
            silver: "#bfbfbf",
          },
        },
        tertiary: {
          bg: {
            btn: "#191919",
          },
        },
        disabled: "#c2c2c2",
      },
    },
  },
  plugins: [],
};
