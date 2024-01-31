import {
  Box,
  Burger,
  Container,
  Flex,
  Group,
  Text,
  TextInput,
} from "@mantine/core";
import logo from "@/assets/movix-logo.svg";
import { useState, useCallback, useEffect } from "react";
import { useMediaQuery, useDisclosure } from "@mantine/hooks";
import { FiSearch } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [scroll, setScroll] = useState(false);
  const [show, setShow] = useState(false);
  const [lastscrollY, setLastScrollY] = useState(0);
  const [opened, { toggle }] = useDisclosure(false);
  const label = opened ? "Close navigation" : "Open navigation";
  const isSmallerThanTable = useMediaQuery("(max-width:768px)");
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    if (scrollTop > 100) {
      if (scrollTop > lastscrollY) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    } else {
      setScroll(false);
    }
    setLastScrollY(scrollTop);
  }, [lastscrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const navigationhandler = (type: string) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
  };

  return (
    <Box
      p={15}
      style={{
        transition: "all ease 0.5s",
        background: scroll ? "" : "rgba(0, 0, 0, 0.25)",
        transform: scroll ? "translateY(-60px)" : "",
        position: "relative",
        zIndex: 50,
      }}
    >
      <Container size={"lg"}>
        <Flex justify={"space-between"}>
          <img
            src={logo}
            alt=""
            width={100}
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
          <Flex
            gap={"lg"}
            align={"center"}
            direction={isSmallerThanTable ? "row-reverse" : "row"}
          >
            {isSmallerThanTable ? (
              <>
                <Burger
                  color="white"
                  opened={opened}
                  onClick={toggle}
                  aria-label={label}
                />
                {opened && (
                  <Group position="center" mt={30} className="navbar-opened">
                    <Flex direction={"column"} w={"100%"}>
                      <Text
                        className="navbar"
                        onClick={() => navigationhandler("movie")}
                      >
                        Movies
                      </Text>
                      <Text
                        className="navbar"
                        onClick={() => navigationhandler("tv")}
                      >
                        TV Shows
                      </Text>
                    </Flex>
                  </Group>
                )}
              </>
            ) : (
              <Flex gap={20}>
                <Text
                  className="navbar"
                  onClick={() => navigationhandler("movie")}
                >
                  Movies
                </Text>
                <Text
                  className="navbar"
                  onClick={() => navigationhandler("tv")}
                >
                  TVShows
                </Text>
              </Flex>
            )}
            <FiSearch
              onClick={() => setShow(!show)}
              style={{
                cursor: "pointer",
                fontSize: "20px",
                color: "white",
              }}
            />
            {show && (
              <form className="search-form">
                <TextInput
                  placeholder="Search Movie"
                  className="search-text-input"
                  rightSection={
                    <ImCross
                      onClick={() => setShow(!show)}
                      style={{
                        color: "#000fee",
                        cursor: "pointer",
                      }}
                    />
                  }
                />
              </form>
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
