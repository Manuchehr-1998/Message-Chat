module.exports = {
  mode: "jit",
  content: [
    "./src/**/**/*.{js,ts,jsx,tsx,html,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,html,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      lg: { max: "1440px" },
      md: { max: "1050px" },
      sm: { max: "550px" },
    },
    extend: {
      backgroundImage: {
        "custom-gradient": "linear-gradient(180deg, #EFEFEF 0%, #E3D6D6 100%)",
      },
      colors: {
        blue_gray: {
          100: "var(--blue_gray_100)",
          400: "var(--blue_gray_400)",
          "400_14": "var(--blue_gray_400_14)",
          "400_1c": "var(--blue_gray_400_1c)",
        },
        deep_purple: {
          a200_6c: "var(--deep_purple_a200_6c)",
          a400: "var(--deep_purple_a400)",
          a400_6c: "var(--deep_purple_a400_6c)",
          a400_7a: "var(--deep_purple_a400_7a)",
        },
        gray: { 50: "var(--gray_50)", 400: "var(--gray_400)" },
        indigo: {
          50: "var(--indigo_50)",
          900: "var(--indigo_900)",
          "400_1c": "var(--indigo_400_1c)",
          "400_47": "var(--indigo_400_47)",
          "400_7c": "var(--indigo_400_7c)",
          "50_01": "var(--indigo_50_01)",
          "50_02": "var(--indigo_50_02)",
          "900_01": "var(--indigo_900_01)",
          "900_02": "var(--indigo_900_02)",
        },
        light_blue: { a700: "var(--light_blue_a700)" },
        white: { a700: "var(--white_a700)" },
      },
      boxShadow: {
        xs: "14px 17px 40px 4px #7090b014",
        sm: "0 17px 40px 4px #7090b01c",
        md: "22px 35px 91px 0 #00000019",
        lg: "0 21px 27px -10px #603cff7a",
      },
      backgroundImage: {
        gradient: "linear-gradient(15deg, #4a25e16c,#7a5aff6c)",
        gradient1: "linear-gradient(270deg, #0084ff,#003464)",
      },
      fontFamily: {
        plusjakartasans: "Plus Jakarta Sans",
        gilroymedium: "Gilroy-Medium",
        poppins: "Poppins",
        gilroybold: "Gilroy-Bold",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
