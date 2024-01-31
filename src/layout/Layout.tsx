import { Box, Flex } from "@mantine/core";
import Header from "./Header";
import Footer from "./Footer";
import { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Flex direction={"column"} bg={"#04152d"}>
      <Header />
      <Box style={{ flexShrink: 1 }}>{children}</Box>
      <Footer />
    </Flex>
  );
};

export default Layout;
