// import { Global, rem } from "@mantine/core";
// import { useMediaQuery } from "@mantine/hooks";

// const MyGlobalStyle = () => {
//   const isSmallerThanTable = useMediaQuery("(max-width:768px)");

//   return (
//     <Global
//       styles={(theme) => ({
//         ":root": {
//           fontFamily: "Inter,Avenir,Helvetica,Arial,SansSerif",
//           textRendering: "optimizeLegibility",
//           WebkitFontSmoothing: "antialized",
//           MozOsxFontSmoothing: "grayscale",
//           WebkitTextSizeAdjust: "100%",
//           "--black": " #04152d",
//         },
//         "::-webkit-scrollbar": {
//           display: "none",
//         },
//         "*": {
//           margin: 0,
//           padding: 0,
//           boxSizing: "border-box",
//         },
//         body: {
//           backgroundColor: "var(--black)",
//         },

//         // header.tsx

//         ".navbar": {
//           color: "white",
//           cursor: "pointer",
//           fontWeight: 500,
//           transition: "0.5s",
//           "&:hover": {
//             color: "purple",
//           },
//         },
//         ".search-form": {
//           position: "absolute",
//           left: "50%",
//           transform: "translateX(-50%)",
//           width: "80%",
//           top: 80,
//           zIndex: 100,
//           borderRadius: 30,
//           background: "rgba(0, 0, 0, 0.25)",
//         },
//         ".search-text-input": {
//           input: {
//             background: "#fff",
//             padding: 20,
//             color: "#000",
//             borderRadius: "30px",
//           },
//         },
//         //header.tsx media-query
//         ".navbar-opened": {
//           position: "absolute",
//           padding: 10,
//           top: 50,
//           left: "50%",
//           transform: "translateX(-50%)",
//           width: "100%",
//           zIndex: 100,
//           background: "rgba(0, 0, 0, 0.25)",
//         },

//         //herosection
//         ".hero-section-form": {
//           input: {
//             background: "white",
//             color: "#000",
//             border: "none",
//             borderTopLeftRadius: 30,
//             borderBottomLeftRadius: 30,
//             borderTopRightRadius: "unset",
//             borderBottomRightRadius: "unset",
//             fontWeight: 500,

//             "&::placeholder": {
//               color: "dark",
//               fontWeight: isSmallerThanTable ? 400 : 500,
//             },
//           },
//         },
//         ".hero-section-button": {
//           border: "none",
//           background: "linear-gradient(to left top, #f7ff00, #db36a4)",
//           borderTopLeftRadius: "unset",
//           borderBottomLeftRadius: "unset",
//           borderTopRightRadius: 30,
//           borderBottomRightRadius: 30,
//         },
//         ".segment-control": {
//           root: {
//             width: 200,
//             backgroundColor: "white",
//             color: "#000",
//             boxShadow: theme.shadows.md,
//             border: `${rem(1)} solid ${
//               theme.colorScheme === "dark"
//                 ? theme.colors.dark[4]
//                 : theme.colors.gray[1]
//             }`,
//           },

//           indicator: {
//             backgroundImage: "linear-gradient(to left top, #f7ff00, #db36a4)",
//           },

//           control: {
//             border: "0 !important",
//           },

//           label: {
//             color: "#000",
//             ":hover": {
//               color: "#000",
//             },
//           },
//         },

//         //footer-section
//         ".footer-nav": {
//           textDecoration: "none",
//           fontWeight: 500,
//           color: "white",
//           transition: "0.5s",
//           cursor: "pointer",
//           fontSize: isSmallerThanTable ? 13 : 20,
//           "&:hover": {
//             color: "purple",
//           },
//         },

//         ".video,.videoSection": {
//           cursor: "pointer",
//           transition: "all 0.5s  ease-in-out",
//           "&:hover": {
//             polygon: {
//               strokeDashoffset: 0,
//               transform: "translateY(0)",
//               stroke: "#DA2F68FF",
//             },
//             circle: {
//               stroke: "#DA2F68FF",
//               strokeDashoffset: 0,
//             },
//           },
//         },
//         ".videoSection": {
//           position: "absolute",
//           top: "30%",
//           left: "50%",
//           transform: "translateX(-50%)",
//         },
//         ".circular-progress-movie": {
//           position: "relative",
//           width: 40,
//           top: -20,
//           left: 10,
//           height: 40,
//           background: "white",
//           borderRadius: "50%",
//           flexShrink: 0,
//           padding: 2,
//         },
//       })}
//     />
//   );
// };

// export default MyGlobalStyle;

import { Text, createTheme, rem } from "@mantine/core";

export const theme = createTheme({
  // Global Styles
  fontFamily: `'Inter', sans-serif`,
  primaryColor: "fary",
  primaryShade: { light: 4, dark: 6 },
  colors: {
    fary: [
      "#e5f2ff",
      "#cde0ff",
      "#9abdff",
      "#6399ff",
      "#367aff",
      "#1866ff",
      "#005cff",
      "#004de5",
      "#0044cd",
      "#003ab6",
    ],
    // Prefer mantine dark color scheme prior to 7.3.0
    dark: [
      "#C1C2C5",
      "#A6A7AB",
      "#909296",
      "#5c5f66",
      "#373A40",
      "#2C2E33",
      "#25262b",
      "#1A1B1E",
      "#141517",
      "#101113",
    ],
  },
  radius: {
    md: "0.625rem",
  },

  // Component Styles
  components: {
    Text: Text.extend({
      defaultProps: {
        size: rem(14),
        lh: 1.25,
      },
    }),
  },
});
