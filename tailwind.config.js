export default {
  content: [
    "./frontends/**/*.{tsx,js}",
    "./elements/**/*.{tsx,js}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      screens: {
        "@374": "374px",
        "@464": "464px",
        "@500": "500px",
        "@550": "550px",
        "@600": "600px",
        "@700": "700px",
        "@767": "767px",
        "@800": "800px",
        "@900": "900px",
        "@992": "992px",
        "@1000": "1000px",
        "@1100": "1100px",
        "@1280": "1280px",
        "@2000": "2000px",
      },
      backgroundSize: {
        "100%": "100%",
        "125%": "125%",
      },
      fontSize: {
        base: "clamp(1.75rem,2vw,2rem)",
        little: "clamp(1rem,2vw,1.125rem)",
      },
    },
  },
  safelist: ["bg-orange-400", "scale-[1.1]"],
  plugins: [],
};
