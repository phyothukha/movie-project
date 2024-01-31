import { useParams } from "react-router-dom";
import DetailBanner from "./components/DetailBanner";
import { useQuery } from "react-query";
import Cast from "./components/Cast";
import VideoSection from "./components/VideoSection";
import { Container } from "@mantine/core";
import fetchDataFromApi from "@/api";
import { CreditType, videoType } from "@/types/MovieDetail/Credits";
import { useStyle } from "@/styles/UseStyles";
import { movieType } from "@/types/MovieType/movietype";
import Layout from "@/layout/Layout";
import CarouselComponent from "@/components/carousel/Carousel";

const Detail = () => {
  const { classes } = useStyle();
  const { mediatype, id } = useParams();
  const { data: detailvideo } = useQuery<videoType>({
    queryKey: ["detail-video", id],
    queryFn: () => fetchDataFromApi(`${mediatype}/${id}/videos`),
    refetchOnWindowFocus: false,
  });
  const { data: credits, isFetching: creditloading } = useQuery<CreditType>({
    queryKey: ["credits", { id, mediatype }],
    queryFn: () => fetchDataFromApi(`${mediatype}/${id}/credits`),
  });

  const {
    data: similarMovie,
    isLoading: SimilarLoading,
    isFetching: SimilarFetching,
  } = useQuery<movieType>({
    queryKey: ["Similar-movie", mediatype, id],
    queryFn: () => fetchDataFromApi(`${mediatype}/${id}/similar`),
    refetchOnWindowFocus: false,
  });
  const title = mediatype === "tv" ? "Similar TV shows" : "Similar Movies";

  const {
    data: recommandMovie,
    isLoading: recommanLoading,
    isFetching: recommandFetching,
  } = useQuery<movieType>({
    queryKey: ["recommand-movie", { mediatype, id }],
    queryFn: () => fetchDataFromApi(`${mediatype}/${id}/recommendations`),
    refetchOnWindowFocus: false,
  });
  const title2 = mediatype === "tv" ? "Recommand TV shows" : "Recommand Movies";

  return (
    <Layout>
      <DetailBanner video={detailvideo?.results[0]} crew={credits?.crew} />
      <Cast cast={credits?.cast} loading={creditloading} />
      <VideoSection video={detailvideo?.results} />
      <Container size={"lg"} my={30}>
        <CarouselComponent
          data={similarMovie?.results}
          loading={SimilarFetching || SimilarLoading}
          endpoint={"tv"}
          title={title}
        />
      </Container>

      <Container size={"lg"} my={30}>
        <CarouselComponent
          data={recommandMovie?.results}
          loading={recommanLoading || recommandFetching}
          endpoint={mediatype}
          title={title2}
        />
      </Container>
      <div className={classes.backShadow}></div>
    </Layout>
  );
};

export default Detail;
