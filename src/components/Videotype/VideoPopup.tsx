import { useStyle } from "@/styles/UseStyles";
import { Flex, Card, CloseButton } from "@mantine/core";
import { Dispatch, FC, SetStateAction } from "react";
import ReactPlayer from "react-player";

interface VideoPopupProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  videoId?: string;
  setVideoId: Dispatch<SetStateAction<string>>;
}

const VidepPopup: FC<VideoPopupProps> = ({
  show,
  setShow,
  videoId,
  setVideoId,
}) => {
  const { classes } = useStyle();
  const hidePopup = () => {
    setShow(false);
    setVideoId("");
  };
  if (show)
    return (
      <Flex className={classes.flexLayer}>
        <div
          className={classes.opacityLayer}
          style={{ opacity: show ? 1 : 0 }}
        ></div>
        <Flex direction={"column"} align={"end"}>
          <CloseButton size={30} aria-label="Close modal" onClick={hidePopup} />
          <Card p={0}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`} />
          </Card>
        </Flex>
      </Flex>
    );
};

export default VidepPopup;
