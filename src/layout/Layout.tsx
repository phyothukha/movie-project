import { Box } from "@mantine/core";
import Header from "./Header";
import Footer from "./Footer";
import { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#04152d",
        height: "100vh",
        justifyContent: "space-between",
      }}
    >
      <Header />
      <Box
        style={{
          flexShrink: 1,
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
