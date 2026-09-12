import { createTheme } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "primary",
  fontFamily: "YS Text, sans-serif",
  headings: {
    fontFamily: "YS Text, sans-serif",
  },

  colors: {
    primary: [
      "#eef8fc",
      "#d8edf6",
      "#b4dbea",
      "#8ac5dc",
      "#5aa9c6",
      "#2b8bad",
      "#00507b",
      "#003f61",
      "#002f49",
      "#001f31",
    ],
  },

  breakpoints: {
    xs: "30em",
    sm: "48em",
    md: "64em",
    lg: "74em",
    xl: "90em",
    xxl: "120em",
  },
});
