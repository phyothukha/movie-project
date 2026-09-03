import { Box, Container, Flex, SegmentedControl, Title } from "@mantine/core";
import { useState } from "react";
import { useGetTrending } from "@/store/server/movies/queries";
import CarouselComponent from "@/components/carousel/Carousel";
import { useSegements } from "@/styles/SegmentStyle";
import { useMediaQuery } from "@mantine/hooks";

const Trending = () => {
  const [endpoint, setEndpoint] = useState<"day" | "week">("day");
  const { data: trendMovie, isLoading, isFetching } = useGetTrending(endpoint);
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
