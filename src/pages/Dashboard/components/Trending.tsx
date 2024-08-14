import { Box, Container, Flex, SegmentedControl, Title } from "@mantine/core";
import { useQuery } from "react-query";
import { useState } from "react";
import fetchDataFromApi from "@/api";
import { movieType } from "@/types/MovieType/movietype";
import CarouselComponent from "@/components/carousel/Carousel";
import { useSegements } from "@/styles/UseSegment";
import { useMediaQuery } from "@mantine/hooks";

const Trending = () => {
  const [endpoint, setEndpoint] = useState("day");
  const {
    data: trendMovie,
    isLoading,
    isFetching,
  } = useQuery<movieType>({
    queryKey: ["trend-movie", endpoint],
    queryFn: () => fetchDataFromApi(`/trending/all/${endpoint}`),
    refetchOnWindowFocus: false,
  });
  const onTabChange = (data: string) => {
    setEndpoint(data === "Day" ? "day" : "week");
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
            Trending
          </Title>
          <SegmentedControl
            radius="xl"
            size={"sm"}
            data={["Day", "Week"]}
            classNames={classes}
            onChange={onTabChange}
          />
        </Flex>
        <CarouselComponent
          data={trendMovie?.results}
          loading={isFetching || isLoading}
        />
      </Container>
    </Box>
  );
};

export default Trending;
