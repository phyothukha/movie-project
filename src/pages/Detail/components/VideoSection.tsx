import { Container, Title } from "@mantine/core";
import { FC, useState } from "react";
import { Carousel } from "@mantine/carousel";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useMediaQuery } from "@mantine/hooks";
import { videoresult } from "@/types/MovieDetail/Credits";
import Polygon from "@/components/Videotype/Polygon";
import VidepPopup from "@/components/Videotype/VideoPopup";

interface VideoProps {
  video?: videoresult[];
}

const VideoSection: FC<VideoProps> = ({ video }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState<string>("");
  const isSmallerThanTable = useMediaQuery("(max-width:768px)");
  return (
    <Container
      my={20}
      size={"lg"}
      style={{
        position: "relative",
        zIndex: 20,
      }}
    >
      {video && video?.length !== 0 && (
        <Title my={10} size={20}>
          official Video
        </Title>
      )}
      <Carousel
        slidesToScroll={5}
        slideSize={isSmallerThanTable ? "40%" : "20%"}
        slideGap="md"
        withControls={false}
        align="start"
      >
        {video?.map((item, index) => (
          <Carousel.Slide
            key={index}
            onClick={() => {
              setShow(true);
              setVideoId(item.key);
            }}
          >
            <LazyLoadImage
              src={`https://img.youtube.com/vi/${item.key}/mqdefault.jpg`}
              alt={""}
              width={300}
              height={200}
              style={{
                borderRadius: "5px",
                cursor: "pointer",
              }}
            />
            <div className={"videoSection"}>
              <Polygon />
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
      <VidepPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </Container>
  );
};

export default VideoSection;
