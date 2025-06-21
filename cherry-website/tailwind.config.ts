import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        primary: {
          50: "#FFF6F6",
          100: "#FFEBEB", 
          200: "#FFDCDC",
          300: "#FFB3B3",
          400: "#FF8A8A",
          500: "#FF6161",
          600: "#FF3838",
          700: "#FF0F0F",
          800: "#E60000",
          900: "#B30000",
          DEFAULT: "#FFDCDC",
        },
        secondary: {
          50: "#FFF9F5",
          100: "#FFF2EB",
          200: "#FFE6D6",
          300: "#FFD4B8",
          400: "#FFC299",
          500: "#FFB07A",
          600: "#FF9E5B",
          700: "#FF8C3C",
          800: "#FF7A1D",
          900: "#E6650A",
          DEFAULT: "#FFF2EB",
        },
        accent: {
          50: "#FFF5E6",
          100: "#FFEACC",
          200: "#FFE8CD",
          300: "#FFD6BA",
          400: "#FFCAA7",
          500: "#FFBE94",
          600: "#FFB281",
          700: "#FFA66E",
          800: "#FF9A5B",
          900: "#FF8E48",
          DEFAULT: "#FFE8CD",
        },
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6", 
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
        white: "#ffffff",
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Georgia', 'serif'],
        'mono': ['Fira Code', 'Monaco', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config; 