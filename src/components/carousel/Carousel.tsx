import React from "react";
import { Carousel } from "@mantine/carousel";
import { Skeleton, Title } from "@mantine/core";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useMediaQuery } from "@mantine/hooks";
import { resultType } from "@/types/MovieType/movietype";
import { useStyle } from "@/styles/UseStyles";
import MovieCard from "../MovieCard/MovieCard";

interface CarouselProps {
  title?: string;
  data?: resultType[];
  loading: boolean;
  endpoint?: string | string[];
}

const CarouselComponent: React.FC<CarouselProps> = ({
  title,
  data,
  loading,
  endpoint,
}) => {
  const isSmallerThanTable = useMediaQuery("(max-width:768px)");
  const isSmallestTable = useMediaQuery("(max-width:420px)");
  const { classes } = useStyle();

  const hasData = data && data !== undefined && data?.length > 0;

  if (hasData)
    return (
      <>
        <Title fw={500} size={isSmallerThanTable ? 18 : 20}>
          {title}
        </Title>
        <Carousel
          my={20}
          slideSize={
            isSmallestTable ? "50%" : isSmallerThanTable ? "33.33%" : "20%"
          }
          slideGap={isSmallerThanTable ? "md" : "lg"}
          loop
          align="start"
          withControls={data?.length > 5 && !isSmallerThanTable ? true : false}
          slidesToScroll={2}
          classNames={classes}
          nextControlIcon={
            <BsFillArrowRightCircleFill size={30} color="#000" />
          }
          previousControlIcon={
            <BsFillArrowLeftCircleFill size={30} color="#000" />
          }
        >
          {loading
            ? [1, 2, 3, 4, 5]?.map((trend) => (
                <Carousel.Slide key={trend}>
                  <Skeleton h={300} w={"100%"} className={classes.sketon} />
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
            : data?.map((trend) => {
                if (trend.id) {
                  return (
                    <Carousel.Slide key={trend.id}>
                      <MovieCard
                        explore={trend}
                        mediatype={trend.media_type || endpoint}
                      />
                    </Carousel.Slide>
                  );
                }
              })}
        </Carousel>
      </>
    );
};

export default CarouselComponent;
