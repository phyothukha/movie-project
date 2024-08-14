import { Container, Center, Flex, Text } from "@mantine/core";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import { useMediaQuery } from "@mantine/hooks";
import { useStyle } from "@/styles/UseStyles";

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
  const { classes } = useStyle();
  return (
    <Center
      style={{
        background: "#020c1b",
        position: "relative",
      }}
    >
      <Container
        size={"lg"}
        my={30}
        style={{
          textAlign: "center",
        }}
      >
        <Flex direction={"column"} gap={30}>
          <Flex justify={"center"} gap={20} align={"center"} h={"100%"}>
            {footerData.map(({ id, NavTitle }) => (
              <Text key={id} className={"footer-nav"}>
                {NavTitle}
              </Text>
            ))}
          </Flex>
          <Text
            color="#dadce0"
            fz={isSmallerThanTable ? 14 : 20}
            fw={"bold"}
            opacity={0.5}
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis
            iusto esse tempora nam blanditiis assumenda asperiores facere, odit,
            saepe minima labore sequi illo, reprehenderit repellendus ipsam
            quasi. Doloremque, voluptate possimus.
          </Text>
          <Flex justify={"center"} gap={isSmallerThanTable ? 10 : 30}>
            {footerData.map(
              ({ id, icon }) =>
                icon && (
                  <div className={classes.logo} key={id}>
                    {icon}
                  </div>
                )
            )}
          </Flex>
        </Flex>
      </Container>
    </Center>
  );
};

export default Footer;
