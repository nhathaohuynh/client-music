/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      screens: {
        1400: "1400px",
      },
      backgroundColor: {
        "main-100": "#130c1c",
        "main-200": "#170f23",
        "main-300": "#170f23",
        "main-400": "#231b2e",
        "main-500": "#9b4de0",
      },
      colors: {
        "white-100": "#fdfdfd",
        "white-200": "#d5d4d5",
        "white-300": "#78747d",
        "main-500": "#9b4de0",
      },
      keyframes: {
        "slide-right": {
          "0%": {
            "-webkit-transform": "translateX(-500px)",
            transform: "translateX(-500px)",
            opacity: "0",
          },
          "100%": {
            "-webkit-transform": "translateX(0)",
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        "slide-left": {
          "0%": {
            "-webkit-transform": "translateX(500px)",
            transform: "translateX(500px)",
          },
          "100%": {
            "-webkit-transform": "translateX(0)",
            transform: "translateX(0)",
          },
        },
        "slide-left-between": {
          "0%": {
            "-webkit-transform": "translateX(500px)",
            transform: "translateX(500px)",
          },
          "100%": {
            "-webkit-transform": "translateX(0)",
            transform: "translateX(0)",
          },
        },
        "rotate-center": {
          "0%": {
            "-webkit-transform": "rotate(0)",
            transform: "rotate(0)",
          },
          "100%": {
            "-webkit-transform": "rotate(360deg)",
            transform: "rotate(360deg)",
          },
        },
        "rotate-center-pause": {
          "0%": {
            "-webkit-transform": "rotate(0)",
            transform: "rotate(0)",
            "border-radius": "999px",
          },
          "100%": {
            "-webkit-transform": "rotate(360deg)",
            transform: "rotate(360deg)",
          },
        },
        "hide-sidebar-right": {
          "0%": {
            "-webkit-transform": "translateX(300px)",
            transform: "translateX(300px)",
          },
          "100%": {
            "-webkit-transform": "translateX(0)",
            transform: "translateX(0)",
          },
        },
        "show-sidebar-right": {
          "0%": {
            "-webkit-transform": "translateX(0)",
            transform: "translateX(0)",
          },
          "100%": {
            "-webkit-transform": "translateX(500px)",
            transform: "translateX(500px)",
          },
        },
        "scale-up-center": {
          "0%": {
            "-webkit-transform": "scale(1.2)",
            transform: "scale(1.2)",
          },
          "100%": {
            "-webkit-transform": "scale(1)",
            transform: "scale(1)",
          },
        },

        "scale-up-image": {
          "0%": {
            "-webkit-transform": "scale(1)",
            transform: "scale(1)",
          },
          "100%": {
            "-webkit-transform": "scale(1.2)",
            transform: "scale(1.2)",
          },
        },
        "show-bg-header": {
          "0%": {
            height: "0px",
          },
          "100%": {
            height: "70px",
          },
        },
        "hide-bg-header": {
          "0%": {
            height: "70px",
          },
          "100%": {
            height: "0px",
          },
        },
      },
      animation: {
        "slide-right":
          "slide-right .65s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "slide-left":
          "slide-left .5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "slide-left-between":
          "slide-left-between .5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "rotate-center": "rotate-center 8s linear infinite both",
        "rotate-center-pause": "rotate-center-pause 0.3s linear 1 both",
        "hide-sidebar-right":
          "hide-sidebar-right .75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "show-sidebar-right":
          "show-sidebar-right 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "scale-up-center":
          "scale-up-center 1.5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
        "scale-up-image":
          "scale-up-image 1.5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
        "show-bg-header":
          "show-bg-header 1s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
        "hide-bg-header":
          "hide-bg-header 0.75s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
      },
    },
  },
};
