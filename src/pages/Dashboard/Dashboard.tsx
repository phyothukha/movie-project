import HeroBanner from "./components/HeroBanner";
import Layout from "@/layout/Layout";
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import Toprated from "./components/Toprated";
import { Card, Container, Skeleton, Text, Title } from "@mantine/core";
import { useQuery } from "react-query";
import { CastListType } from "@/types/CastType/Cast";
import fetchDataFromApi from "@/api";
import { Carousel } from "@mantine/carousel";
import { useStyle } from "@/styles/UseStyles";
import useHomeStore from "@/store/movieslice";
import { useNavigate } from "react-router-dom";
import PosterFallback from "@/assets/no-poster.png";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useMediaQuery } from "@mantine/hooks";

const Dashboard = () => {
  const {
    data: CastData,
    isLoading,
    isFetching,
  } = useQuery<CastListType>({
    queryKey: ["cast-data"],
    queryFn: () => fetchDataFromApi(`person/popular`),
    refetchOnWindowFocus: false,
  });

  const { classes } = useStyle();
  const isSmallerThanTable = useMediaQuery("(max-width:768px)");
  const isSmallestTable = useMediaQuery("(max-width:390px)");
  const { url } = useHomeStore();
  const navigate = useNavigate();
  const CastResult = CastData?.results;

  return (
    <Layout>
      <HeroBanner />
      <Trending />
      <Popular />
      <Toprated />
      <Container my={20} size={"lg"}>
        <Title fw={500} size={isSmallerThanTable ? 18 : 20}>
          Cast List
        </Title>

        <Carousel
          my={20}
          slideSize={
            isSmallestTable ? "50%" : isSmallerThanTable ? "33.33%" : "20%"
          }
          slideGap={isSmallerThanTable ? "md" : "lg"}
          loop
          align="start"
          classNames={classes}
          slidesToScroll={3}
          withControls={isSmallerThanTable ? false : true}
          nextControlIcon={
            <BsFillArrowRightCircleFill size={30} color="#000" />
          }
          previousControlIcon={
            <BsFillArrowLeftCircleFill size={30} color="#000" />
          }
        >
          {isLoading || isFetching
            ? [1, 2, 3, 4, 5]?.map((ske) => (
                <Carousel.Slide key={ske}>
                  <Skeleton
                    h={isSmallerThanTable ? 250 : 280}
                    w={"100%"}
                    className={classes.sketon}
                  />
                  <Skeleton
                    mt={20}
                    h={20}
                    w={"90%"}
                    className={classes.sketon}
                  />
                  <Skeleton
                    mt={20}
                    h={20}
                    w={"50%"}
                    className={classes.sketon}
                  />
                </Carousel.Slide>
              ))
            : CastResult?.map((trend) => {
                const postUrl = trend.profile_path
                  ? url.profile + trend.profile_path
                  : PosterFallback;
                if (trend.id) {
                  return (
                    <Carousel.Slide key={trend.id}>
                      <Card
                        h={isSmallerThanTable ? 250 : 280}
                        w={"100%"}
                        p={0}
                        color="red"
                        style={{ cursor: "pointer", position: "relative" }}
                        onClick={() => navigate(`/cast/${trend.id}`)}
                      >
                        <img
                          width={"100%"}
                          height={"100%"}
                          src={postUrl}
                          alt="cast-image"
                        />
                      </Card>
                      <Text fw={700} size={isSmallerThanTable ? 14 : 18}>
                        {trend.name}
                        ...
                      </Text>
                    </Carousel.Slide>
                  );
                }
              })}
        </Carousel>
      </Container>
    </Layout>
  );
};

export default Dashboard;
