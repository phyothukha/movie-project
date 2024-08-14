import { Box, Container, Flex, SegmentedControl, Title } from "@mantine/core";
import { useQuery } from "react-query";
import { movieType } from "@/types/MovieType/movietype";
import { useState } from "react";
import CarouselComponent from "@/components/carousel/Carousel";
import fetchDataFromApi from "@/api";
import { useSegements } from "@/styles/UseSegment";
import { useMediaQuery } from "@mantine/hooks";
const Popular = () => {
  const [endpoint, setEndpoint] = useState("tv");

  const {
    data: trendMovie,
    isLoading,
    isFetching,
  } = useQuery<movieType>({
    queryKey: ["popular-movie", endpoint],
    queryFn: () => fetchDataFromApi(`/${endpoint}/popular`),
    refetchOnWindowFocus: false,
  });
  const onTabChange = (data: string) => {
    setEndpoint(data === "TV" ? "tv" : "movie");
  };

  const { classes } = useSegements();
  const isSmallerThanTable = useMediaQuery("(max-width:768px)");
  return (
    <Box
      bg={"#04152d"}
      h={"100%"}
      style={{
        position: "relative",
      }}
    >
      <Container mt={50} size={"lg"}>
        <Flex justify={"space-between"} align={"center"}>
          <Title fw={500} size={isSmallerThanTable ? 18 : 20}>
            Popular
          </Title>
          <SegmentedControl
            radius="xl"
            size={"sm"}
            data={["TV", "MOVIE"]}
            classNames={classes}
            onChange={onTabChange}
          />
        </Flex>
        <CarouselComponent
          data={trendMovie?.results}
          loading={isFetching || isLoading}
          endpoint={endpoint}
        />
      </Container>
    </Box>
  );
};

export default Popular;
