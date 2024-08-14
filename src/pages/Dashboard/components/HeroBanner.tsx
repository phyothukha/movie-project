import {
  Box,
  Button,
  Container,
  Flex,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useMediaQuery } from "@mantine/hooks";
import useHomeStore from "@/store/movieslice";
import { useQuery } from "react-query";
import { movieType } from "@/types/MovieType/movietype";
import fetchDataFromApi from "@/api";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useStyle } from "@/styles/UseStyles";

const HeroBanner = () => {
  const { classes } = useStyle();
  const [background, setBackground] = useState("");
  const { url } = useHomeStore();
  const [query, setQuery] = useState<string>("");
  const isSmallerThanTable = useMediaQuery("(max-width:768px)");
  const navigate = useNavigate();
  const { isFetching } = useQuery<movieType>({
    queryKey: "movie-list",
    queryFn: () => fetchDataFromApi("/movie/upcoming"),
    refetchOnWindowFocus: false,
    onSuccess: (Movie) => {
      const randombgPath =
        url.backdrop +
        Movie?.results?.[Math.floor(Math.random() * 20)].backdrop_path;
      setBackground(randombgPath);
    },
  });

  const searchData = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  return (
    <Container>
      {!isFetching && (
        <LazyLoadImage
          src={background}
          alt="back-drop-image"
          className={classes.lazyImage}
        />
      )}
      <Box>
        <Flex direction={"column"} className={classes.heroSection}>
          <Box pos={"relative"}>
            <Title size={isSmallerThanTable ? 50 : 80} color="white">
              Welcome
            </Title>
            <Text size={isSmallerThanTable ? 20 : 25} color="white">
              Millions of movies, TV shows and people to discover. Explore now.
            </Text>
          </Box>
          <form className={classes.hersectionForm} onSubmit={searchData}>
            <TextInput
              type="text"
              size={isSmallerThanTable ? "md" : "xl"}
              placeholder={"Search for a movie or TV show..."}
              w={"100%"}
              onChange={(e) => setQuery(e.target.value)}
              className="hero-section-form"
            />
            <Button
              type="submit"
              className="hero-section-button"
              color="dark"
              variant="outline"
              size={isSmallerThanTable ? "md" : "xl"}
            >
              Search
            </Button>
          </form>
        </Flex>
      </Box>
      <div className={classes.backShadow} />
    </Container>
  );
};

export default HeroBanner;
