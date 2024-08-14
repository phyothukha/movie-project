import { useQuery } from "react-query";
import Layout from "@/layout/Layout";
import CastDetailbanner from "./components/CastDetailbanner";
import fetchDataFromApi from "@/api";
import { useParams } from "react-router-dom";
import { CastBio } from "@/types/CastType/CastBio";
import { Container } from "@mantine/core";
import CarouselComponent from "@/components/carousel/Carousel";
import { CastMovieType } from "@/types/CastType/Cast";

const CastDetail = () => {
  const { castId } = useParams();

  const {
    data: CastBioData,
    isLoading,
    isFetching,
  } = useQuery<CastBio>({
    queryKey: "Cast-Bio-Data",
    queryFn: () => fetchDataFromApi(`person/${castId}`),
    refetchOnWindowFocus: false,
  });

  const {
    data: CastVideoData,
    isLoading: CastLoading,
    isFetching: CastFetching,
  } = useQuery<CastMovieType>({
    queryKey: "Cast-video-data",
    queryFn: () => fetchDataFromApi(`/person/${castId}/combined_credits`),
  });

  const medatype = CastVideoData?.cast[0].media_type;
  const endpoint = medatype === "tv" ? "tv" : "movie";

  return (
    <Layout>
      <CastDetailbanner
        castBio={CastBioData}
        loading={isLoading || isFetching}
      />
      <Container size={"lg"} my={20}>
        <CarouselComponent
          data={CastVideoData?.cast}
          loading={CastLoading || CastFetching}
          endpoint={endpoint}
          title={"Known For Cast"}
        />
      </Container>
      <Container size={"lg"} my={20}>
        <CarouselComponent
          data={CastVideoData?.crew}
          loading={CastLoading || CastFetching}
          endpoint={endpoint}
          title={"Known For Crew"}
        />
      </Container>
    </Layout>
  );
};

export default CastDetail;
