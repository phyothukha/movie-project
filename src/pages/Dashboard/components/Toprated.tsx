import { Box, Container, Flex, SegmentedControl, Title } from "@mantine/core";
import { useState } from "react";
import { useGetTopRated } from "@/store/server/movies/queries";
import CarouselComponent from "@/components/carousel/Carousel";
import { useSegements } from "@/styles/SegmentStyle";
import { useMediaQuery } from "@mantine/hooks";

const Toprated = () => {
  const [endpoint, setEndpoint] = useState("tv");

  const { data: trendMovie, isLoading, isFetching } = useGetTopRated(endpoint);
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
            Top-Rated
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

export default Toprated;
