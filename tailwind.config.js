const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        biscuitReg: ["Biscuit-Reg"],
        biscuitBold: ["Biscuit-Bold"],
        biscuitThin: ["biscuit-Thin"],
        biscuitMed: ["Biscuit-Med"],
      },
    },

    colors: {
      transparent: 'transparent',
      'black': '#000000',
      'white':'#FFFFFF',
      'blue': '#E4F4FF',
      'blue-md': '#D0E5FF',
      'dark-blue': '#7CABE6',
      'pink': '#F2E5FF',
      'dark-gray': '#515151',
      'light-gray': "#CECECE",
      'gray': '#BCBCBC',
      'off-white': "#F6F8FF",
      'storm' : "#EDF1FF",
      'pastel-purple' : "#EBECFF",
      'dark-purple' : "#B3AAEC",
      'purple-md' : "#E0DBFF",
      'pastel-green' : "#C0FCD4",
      'dark-green' : "#5AC38A",
      'pastel-red' : "#FFDBDB",
      'dark-red' : "#FAA6A6",
      'light-pink' : "#FEDCFF",
      'dark-pink' : "#FFA1DF",
      'hover-red' : "#FF8282",
      'hover-purple' : "#9287D9",
      'hover-blue' : "#558DD3",
      'hover-green' : "#40A66F",
      'hover-pink' : "#FF85D5",
      'folder-blue' : "#DFE6FF",
      'darker-gray' : "#808080"
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
