import { createStyles, getStylesRef } from "@mantine/core";

export const useStyle = createStyles((theme) => ({
  //footer
  logo: {
    width: "50px",
    cursor: "pointer",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#04152d",
    borderRadius: "50%",
    transition: "all ease 0.3s",
    "&:hover": {
      boxShadow: "0 0 0.625em #da2f68",
      color: "#da2f68",
    },
  },

  //dasborad.tsx ===herobanner
  lazyImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    opacity: 0.3,
    overflow: "hidden",
    objectFit: "cover",
    objectPosition: "center",
    [theme.fn.smallerThan("lg")]: {},
  },
  heroSection: {
    zIndex: 4,
    height: "80vh",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    position: "relative",
  },
  hersectionForm: {
    marginTop: 20,
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  backShadow: {
    width: "100%",
    height: 600,
    background:
      "linear-gradient(180deg, rgba(4, 21, 45, 0) 0%, #04152d 79.17%)",
    position: "absolute",
    zIndex: 0,
    bottom: -10,
    left: 0,
  },
  sketon: {
    ":after": {
      background: "#0a2955",
    },
  },
  controls: {
    ref: getStylesRef("controls"),
    top: 150,
  },
  contain: {
    ref: getStylesRef("container"),
    width: "20%",
  },
  flexLayer: {
    position: "fixed",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    zIndex: 20,
    left: 0,
    right: 0,
    bottom: 0,
  },
  opacityLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.25)",
    backdropFilter: "blur(3.5px)",
    WebkitBackdropFilter: "blur(3.5px)",
    transition: "opacity 400ms",
  },
}));
