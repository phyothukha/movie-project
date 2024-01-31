import { Global, rem } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const MyGlobalStyle = () => {
  const isSmallerThanTable = useMediaQuery("(max-width:768px)");

  return (
    <Global
      styles={(theme) => ({
        ":root": {
          fontFamily: "Inter,Avenir,Helvetica,Arial,SansSerif",
          textRendering: "optimizeLegibility",
          WebkitFontSmoothing: "antialized",
          MozOsxFontSmoothing: "grayscale",
          WebkitTextSizeAdjust: "100%",
          "--black": " #04152d",
        },
        "::-webkit-scrollbar": {
          display: "none",
        },
        "*": {
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
        },
        body: {
          backgroundColor: "var(--black)",
        },

        // header.tsx

        ".navbar": {
          color: "white",
          cursor: "pointer",
          fontWeight: 500,
          transition: "0.5s",
          "&:hover": {
            color: "purple",
          },
        },
        ".search-form": {
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          top: 80,
          zIndex: 100,
          borderRadius: 30,
          background: "rgba(0, 0, 0, 0.25)",
        },
        ".search-text-input": {
          input: {
            background: "#fff",
            padding: 20,
            color: "#000",
            borderRadius: "30px",
          },
        },
        //header.tsx media-query
        ".navbar-opened": {
          position: "absolute",
          padding: 10,
          top: 50,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          zIndex: 100,
          background: "rgba(0, 0, 0, 0.25)",
        },

        //herosection
        ".hero-section-form": {
          input: {
            background: "white",
            color: "#000",
            border: "none",
            borderTopLeftRadius: 30,
            borderBottomLeftRadius: 30,
            borderTopRightRadius: "unset",
            borderBottomRightRadius: "unset",
            fontWeight: 500,

            "&::placeholder": {
              color: "dark",
              fontWeight: isSmallerThanTable ? 400 : 500,
            },
          },
        },
        ".hero-section-button": {
          border: "none",
          background: "linear-gradient(to left top, #f7ff00, #db36a4)",
          borderTopLeftRadius: "unset",
          borderBottomLeftRadius: "unset",
          borderTopRightRadius: 30,
          borderBottomRightRadius: 30,
        },
        ".segment-control": {
          root: {
            width: 200,
            backgroundColor: "white",
            color: "#000",
            boxShadow: theme.shadows.md,
            border: `${rem(1)} solid ${
              theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.gray[1]
            }`,
          },

          indicator: {
            backgroundImage: "linear-gradient(to left top, #f7ff00, #db36a4)",
          },

          control: {
            border: "0 !important",
          },

          label: {
            color: "#000",
            ":hover": {
              color: "#000",
            },
          },
        },

        //footer-section
        ".footer-nav": {
          textDecoration: "none",
          fontWeight: 500,
          color: "white",
          transition: "0.5s",
          cursor: "pointer",
          fontSize: isSmallerThanTable ? 13 : 20,
          "&:hover": {
            color: "purple",
          },
        },

        ".video,.videoSection": {
          cursor: "pointer",
          transition: "all 0.5s  ease-in-out",
          "&:hover": {
            polygon: {
              strokeDashoffset: 0,
              transform: "translateY(0)",
              stroke: "#DA2F68FF",
            },
            circle: {
              stroke: "#DA2F68FF",
              strokeDashoffset: 0,
            },
          },
        },
        ".videoSection": {
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
        },
        ".circular-progress-movie": {
          position: "relative",
          width: 40,
          top: -20,
          left: 10,
          height: 40,
          background: "white",
          borderRadius: "50%",
          flexShrink: 0,
          padding: 2,
        },
      })}
    />
  );
};

export default MyGlobalStyle;
