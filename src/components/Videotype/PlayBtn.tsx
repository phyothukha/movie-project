import { Flex } from "@mantine/core";
import { FC, useState } from "react";
import VidepPopup from "./VideoPopup";
import { Text } from "@mantine/core";
import Polygon from "./Polygon";
import { videoresult } from "@/types/MovieDetail/Credits";
import { usePolygon } from "@/styles/UsePolygon";

interface videoProps {
  video?: videoresult;
}

const PlayBtn: FC<videoProps> = ({ video }) => {
  const [show, setShow] = useState<boolean>(false);
  const [videoId, setVideoId] = useState<string>("");
  const { classes } = usePolygon();
  return (
    <>
      <Flex
        align={"center"}
        gap={15}
        className="video"
        onClick={() => {
          setShow(true);
          setVideoId(video?.key || "");
        }}
      >
        <Polygon />
        <Text className={classes.vitext}>Watch Trailer</Text>
      </Flex>
      <VidepPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </>
  );
};

export default PlayBtn;
