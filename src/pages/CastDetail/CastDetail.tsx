import Layout from "@/layout/Layout";
import CastDetailbanner from "./components/CastDetailbanner";
import {
  useGetPersonDetail,
  useGetPersonCombinedCredits,
} from "@/store/server/person/queries";
import { useParams } from "react-router-dom";
import { Container } from "@mantine/core";
import CarouselComponent from "@/components/carousel/Carousel";

const CastDetail = () => {
  const { castId } = useParams();

  const {
    data: CastBioData,
    isLoading,
    isFetching,
  } = useGetPersonDetail(castId);

  const {
    data: CastVideoData,
    isLoading: CastLoading,
    isFetching: CastFetching,
  } = useGetPersonCombinedCredits(castId);

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
