import {
  Container,
  Flex,
  Card,
  Box,
  Title,
  Text,
  Badge,
  Divider,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PlayBtn from "../../../components/Videotype/PlayBtn";
import { FC } from "react";
import dayjs from "dayjs";
import PosterFallback from "@/assets/no-poster.png";
import { useMediaQuery } from "@mantine/hooks";
import fetchDataFromApi from "@/api";
import { CrewType, videoresult } from "@/types/MovieDetail/Credits";
import { useStyle } from "@/styles/UseStyles";
import useHomeStore, { genresProps } from "@/store/movieslice";
import { detailProps } from "@/types/MovieDetail/Detail";
import CircularProgress from "@/components/Circular/CircularProgress";
import InfoData from "@/components/InfoData/InfoData";
import Skelton from "@/components/Skeleton/Skeleton";

interface StatusType {
  crew?: CrewType[];
  video?: videoresult;
}

const DetailBanner: FC<StatusType> = ({ crew, video }) => {
  const { classes } = useStyle();
  const { mediatype, id } = useParams();
  const isSmallerThanTable = useMediaQuery("(max-width:768px)");
  const isSmallestTable = useMediaQuery("(max-width:420px)");
  const { url } = useHomeStore();
  const director = crew?.filter((f) => f.job === "Director");
  const writer = crew?.filter(
    (w) => w.job === "Screenplay" || w.job === "Story" || w.job === "Writer"
  );

  const { data: movieDetail, isFetching } = useQuery<detailProps>({
    queryKey: ["movie-detail", { mediatype, id }],
    queryFn: () => fetchDataFromApi(`${mediatype}/${id}`),
    refetchOnWindowFocus: false,
  });

  const toHourandMinute = (totalMinute: number) => {
    const hours = Math.floor(totalMinute / 60);
    const minutes = totalMinute % 60;
    return `${hours}h${minutes > 0 ? `${minutes}m` : ""}`;
  };

  return (
    <Container size={"lg"} my={40}>
      {!isFetching ? (
        <>
          <LazyLoadImage
            className={classes.lazyImage}
            src={url.backdrop + movieDetail?.backdrop_path}
          />
          <Flex
            gap={20}
            // justify={"space-between"}
            w={"100%"}
            style={{
              position: "relative",
              flexFlow: "row wrap",
              zIndex: 10,
            }}
          >
            <Box w={isSmallestTable ? "100%" : "30%"} mx={"auto"}>
              <Card h={500} p={0}>
                <img
                  width={"100%"}
                  height={"100%"}
                  src={
                    movieDetail?.poster_path
                      ? url.poster + movieDetail?.poster_path
                      : PosterFallback
                  }
                  alt={"title"}
                />
              </Card>
            </Box>
            <Box w={isSmallestTable ? "100%" : "65%"}>
              <Flex direction={"column"} gap={10} pos={"relative"}>
                <Title color="white" size={isSmallerThanTable ? 20 : 25}>
                  {movieDetail?.title || movieDetail?.name}
                </Title>
                <Text fw={700} mt={10} size={isSmallerThanTable ? 18 : 20}>
                  {movieDetail?.tagline}
                </Text>
                <Flex gap={5}>
                  {movieDetail?.genres.map(({ id, name }: genresProps) => (
                    <Badge key={id} radius={"sm"} color="pink" variant="filled">
                      {name}
                    </Badge>
                  ))}
                </Flex>
                <Flex align={"center"} gap={30} mt={20}>
                  <Box
                    style={{
                      width: 70,
                      height: 70,
                      background: "white",
                      borderRadius: "50%",
                      padding: 3,
                    }}
                  >
                    <CircularProgress
                      rating={movieDetail?.vote_average.toFixed(1)}
                    />
                  </Box>
                  <PlayBtn video={video} />
                </Flex>
                <Title size={isSmallerThanTable ? 20 : 25}>OverView</Title>
                <Text
                  size={isSmallerThanTable ? 16 : 18}
                  fw={500}
                  color="white"
                >
                  {movieDetail?.overview}
                </Text>
                <Box mb={20}>
                  <Flex gap={20} mt={10}>
                    {movieDetail?.status && (
                      <InfoData label={"Status"} value={[movieDetail.status]} />
                    )}
                    {movieDetail?.release_date && (
                      <InfoData
                        label={"Released-Date"}
                        value={[
                          dayjs(movieDetail.release_date).format("MMM-D-YYYY"),
                        ]}
                      />
                    )}
                    {movieDetail?.runtime && (
                      <InfoData
                        label={"Runtime"}
                        value={[toHourandMinute(movieDetail.runtime)]}
                      />
                    )}
                  </Flex>
                  <Divider />
                  {director && director.length > 0 && (
                    <Box mt={10}>
                      <InfoData
                        label="Director"
                        value={director.map((d) => d.name)}
                      />
                      <Divider />
                    </Box>
                  )}

                  {writer && writer.length > 0 && (
                    <Box mt={10}>
                      <InfoData
                        label="Writer"
                        value={writer.map((w) => w.name)}
                      />
                      <Divider />
                    </Box>
                  )}

                  {movieDetail?.created_by &&
                    movieDetail.created_by.length > 0 && (
                      <Box mt={10}>
                        <InfoData
                          label="Creator"
                          value={movieDetail.created_by.map((c) => c.name)}
                        />
                        <Divider />
                      </Box>
                    )}
                </Box>
              </Flex>
            </Box>
          </Flex>
        </>
      ) : (
        <Skelton style={true} />
      )}
    </Container>
  );
};

export default DetailBanner;
