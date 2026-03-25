// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {

//       keyframes: {
//         slideUp: {
//           '0%': { transform: 'translateY(100%)' },
//           '100%': { transform: 'translateY(0)' },
//         },
//       },

//       animation: {
//         slideUp: 'slideUp 0.4s ease-out',
//       },

//     },
//   },
//   plugins: [],
// }




export default {
  darkMode: 'class', // <-- add this line for dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },

      animation: {
        slideUp: 'slideUp 0.4s ease-out',
      },

    },
  },
  plugins: [],
}