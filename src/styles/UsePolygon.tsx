import { createStyles } from "@mantine/core";

export const usePolygon = createStyles({
  polygon: {
    strokeDasharray: 240,
    strokeDashoffset: 480,
    stroke: "white",
    transform: "translateY(0)",
    transition: "all 0.7s ease-in-out",
    "&:hover": {
      stroke: "red",
    },
  },
  circle: {
    stroke: "white",
    strokeDasharray: 650,
    strokeDashoffset: 1300,
    transition: "all 0.5s ease-in-out",
  },
  vitext: {
    fontSize: 20,
    fontWeight: 500,
    color: "white",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      color: "#DA2F68FF",
    },
  },
  videoSection: {
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translateX(-50%)",
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
  video: {
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
});
