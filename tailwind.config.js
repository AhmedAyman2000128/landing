import plugin from "tailwindcss/plugin";

let font_base = 16;
let font_scale = 1.25;

let h6 = font_base / font_base;
let h5 = h6 * font_scale;
let h4 = h5 * font_scale;
let h3 = h4 * font_scale;
let h2 = h3 * font_scale;
let h1 = h2 * font_scale;

let fontPrimary = "serif";
let fontPrimaryType = "serif";
let fontSecondary = "open sans";
let fontSecondaryType = "sans-serif";

fontPrimary = fontPrimary
  .replace(/\+/g, " ")
  .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;]+/gi, "");

fontSecondary = fontSecondary
  .replace(/\+/g, " ")
  .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;]+/gi, "");

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  safelist: [],
  theme: {
    screens: {
      sm: "540px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        component: {
          '1': '#9AB4C2', //lightBlue
          '2': '#042C42', //darkBlue
          '3': '#0C0F11', //semiBlack
          '4': '#C2E3F2', //lightBlueSecondary
          '5': '#404043', //darkGrey
          '6': "#FFFFFF", //white
          '7':"#000000",//black
          '8':"#0D1A21",//darkBlueSecondary
          '9':"#052539",//darkerBlue
          error:{
            '1':'#940101',//dark red
            '2':'#c01313',//bright red
          },
          pass:{
            '1':'#00480D',//dark green
            '2':'#15803d',//bright green
          },
        },
        //Button background colors
        button: {
          '1': '#9AB4C2', //lighterBlue
          '2': '#042C42', //darkBlue
          '3': "#0C0F11", //semiBlack
          '4': '#056BA1', //lightBlue
          '5': '#FFFFFF', //white
        },
        //Text colors
        text: {
          '1': '#9AB4C2', //lighterBlue
          '2': '#042C42', //darkBlue
          '3':'#0C0F11',  //semiBlack
          '4': '#234354', //lightBlue
          '5':'#C2E3F2',  //lightBlueSecondary
          '6': '#FFFFFF', //white
          '7': '#000000', //black
          '8':"#00B4D8",//lightblue
          error:{
            '1':'#940101',//dark red
            '2':'#c01313',//bright red
          },
          pass:{
            '1':'#00480D',//dark green
            '2':'#15803d',//bright green
          },
        },
        //Input field background colors
        input: {
          '1': '#FFFFFF', //white
          '2': '#313131', //grey
          '3': 'transparent', //transparent
          '4':'#224558',//darkBlue
        },
        //Border colors
        border: {
          '1': '#9AB4C2', //lightBlue
          '2': '#0C0F11', //semiBlack
          '3': '#FFFFFF', //white
          '4':"#000000",//black
          error:{
            '1':'#940101',//dark red
            '2':'#c01313',//bright red
          },
          pass:{
            '1':'#00480D',//dark green
            '2':'#15803d',//bright green
          },
        },
        txt: {
          p: "#000",
          s: "#222",
          light: "#444",
          primary:"#056BA1",
        },
        bg: {
          p: "#fff",
          s: "#ddd",
          t: "#ddd",
          primary:"#042C42",
        },
        border: "#ddd",
    
      },
      minHeight: {
        static_sidemenu: "calc(100vh - 6rem)",
      },
      maxHeight: {
        static_sidemenu: "calc(100vh - 6rem)",
      },
      fontSize: {
        base: font_base + "px",
        h1: h1 + "rem",
        "h1-sm": h1 * 0.8 + "rem",
        h2: h2 + "rem",
        "h2-sm": h2 * 0.8 + "rem",
        h3: h3 + "rem",
        "h3-sm": h3 * 0.8 + "rem",
        h4: h4 + "rem",
        h5: h5 + "rem",
        h6: h6 + "rem",
      },
      fontFamily: {
        primary: [fontPrimary, fontPrimaryType],
        secondary: [fontSecondary, fontSecondaryType],
        poppins: ["Poppins", "sans-serif"],
        dela: ['"Dela Gothic One"', 'sans-serif'],
      },
      spacing: {
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        "1/6": "16.666667%",
        "2/6": "33.333333%",
        "3/6": "50%",
        "4/6": "66.666667%",
        "5/6": "83.333333%",
        "1/12": "8.333333%",
        "2/12": "16.666667%",
        "3/12": "25%",
        "4/12": "33.333333%",
        "5/12": "41.666667%",
        "6/12": "50%",
        "7/12": "58.333333%",
        "8/12": "66.666667%",
        "9/12": "75%",
        "10/12": "83.333333%",
        "11/12": "91.666667%",
        "9/16": "56.25%",
      },
      animation: {
        // Intersect
        fade: "fadeIn 1000ms both",
        fadeUp: "fadeInUp 1000ms both",
        fadeDown: "fadeInDown 1000ms both",
        fadeRight: "fadeInRight 1000ms both",
        fadeLeft: "fadeInLeft 1000ms both",
        scale: "scaleOut 1000ms both",
        // Star Background
        twinkle: "twinkle 5s infinite ease-in-out",
        // Cycle Background
        cycleBg: "cycleBg 60s ease infinite",
        pulseShadow: 'pulseShadow 1s ease-in-out infinite',
      },
      keyframes: {
        pulseShadow: {
          '0%, 100%': {
            boxShadow: '0 0 0px rgba(255, 255, 255, 0)',
          },
          '50%': {
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.7)',
          },
        },
        // Intersect
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(2rem)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: 0, transform: "translateY(-2rem)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeInRight: {
          "0%": { opacity: 0, transform: "translateX(-2rem)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        fadeInLeft: {
          "0%": { opacity: 0, transform: "translateX(2rem)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        scaleOut: {
          "0%": { opacity: 0, transform: "scale(0.5)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        // Star Background
        twinkle: {
          "0%, 20%, 100%": { opacity: 1 },
          "10%": { opacity: 0.25 },
        },
        // Cycle Background
        cycleBg: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      backgroundImage: {
        'ocean-gradient': 'linear-gradient(to right, #7F00FF, #00BFFF)',
        'deep-ocean':'linear-gradient(90deg, #0d1a21, #1f3a52, #3a6a85)',
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("tailwind-bootstrap-grid")({
      generateContainer: false,
      gridGutterWidth: "2rem",
      gridGutters: {
        1: "0.25rem",
        2: "0.5rem",
        3: "1rem",
        4: "1.5rem",
        5: "3rem",
      },
    }),
    plugin(({ addVariant }) => {
      addVariant("intersect", "&:not([no-intersect])");
    }),
  ],
};
