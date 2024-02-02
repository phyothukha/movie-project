import { Text, createTheme, rem } from "@mantine/core";

export const theme = createTheme({
  // Global Styles
  fontFamily: "Inter,Avenir,Helvetica,Arial,SansSerif",
  //   primaryColor: "fary",
  primaryShade: { light: 4, dark: 6 },
  colors: {
    // fary: [
    //   "#e5f2ff",
    //   "#cde0ff",
    //   "#9abdff",
    //   "#6399ff",
    //   "#367aff",
    //   "#1866ff",
    //   "#005cff",
    //   "#004de5",
    //   "#0044cd",
    //   "#003ab6",
    // ],
    // // Prefer mantine dark color scheme prior to 7.3.0
    // dark: [
    //   "#C1C2C5",
    //   "#A6A7AB",
    //   "#909296",
    //   "#5c5f66",
    //   "#373A40",
    //   "#2C2E33",
    //   "#25262b",
    //   "#1A1B1E",
    //   "#141517",
    //   "#101113",
    // ],
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
