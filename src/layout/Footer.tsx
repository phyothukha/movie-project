import { Container, Center, Text, Flex } from "@mantine/core";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import { useMediaQuery } from "@mantine/hooks";
import classes from "./styles/Layout.module.css";

interface footerDataProps {
  id: number;
  NavTitle: string;
  icon?: JSX.Element;
}
[];

const footerData: footerDataProps[] = [
  { id: 1, NavTitle: "Terms Of Use", icon: <FaFacebookF /> },
  { id: 2, NavTitle: "Privacy-Policy", icon: <FaInstagram /> },
  { id: 3, NavTitle: "About", icon: <FaTwitter /> },
  { id: 4, NavTitle: "Blog", icon: <BsLinkedin /> },
  { id: 5, NavTitle: "FAQ" },
];

const Footer = () => {
  const isSmallerThanTable = useMediaQuery("(max-width:768px)");

  return (
    <Center
      bg={"#020c1b"}
      pos={"relative"}
      style={{
        padding: 10,
      }}
    >
      <Container
        size={"lg"}
        my={30}
        style={{
          textAlign: "center",
        }}
      >
        <Flex justify={"center"} direction={"column"}>
          <Flex justify={"center"} gap={"30px"} align={"center"}>
            {footerData.map(({ id, NavTitle }) => (
              <Text key={id} fw={"bold"} className={classes.footerNav}>
                {NavTitle}
              </Text>
            ))}
          </Flex>
          <Text
            c="#dadce0"
            fz={isSmallerThanTable ? 14 : 20}
            fw={"bold"}
            opacity={0.5}
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis
            iusto esse tempora nam blanditiis assumenda asperiores facere, odit,
            saepe minima labore sequi illo, reprehenderit repellendus ipsam
            quasi. Doloremque, voluptate possimus.
          </Text>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 10,
            }}
          >
            {footerData.map(
              ({ id, icon }) =>
                icon && (
                  <div className={classes.logo} key={id}>
                    {icon}
                  </div>
                )
            )}
          </div>
        </Flex>
      </Container>
    </Center>
  );
};

export default Footer;
