import { Card, Text } from "@mantine/core";
import dayjs from "dayjs";
import PosterFallback from "@/assets/no-poster.png";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "../Circular/CircularProgress";
import { useMediaQuery } from "@mantine/hooks";
import useHomeStore from "@/store/movieslice";
import { resultType } from "@/types/MovieType/movietype";

interface exploreProps {
  mediatype?: string | string[];
  explore: resultType;
}

const MovieCard: FC<exploreProps> = ({ explore, mediatype }) => {
  const { url } = useHomeStore();
  const navigate = useNavigate();
  const isSmallerThanTable = useMediaQuery("(max-width:768px)");
  const postUrl = explore.poster_path
    ? url.poster + explore.poster_path
    : PosterFallback;
  const releaseDate = explore.release_date || explore.first_air_date;

  return (
    <>
      <Card
        h={300}
        w={"100%"}
        p={0}
        color="red"
        style={{ cursor: "pointer", position: "relative" }}
        onClick={() => navigate(`/${mediatype}/${explore.id}`)}
      >
        <img width={"100%"} height={"100%"} src={postUrl} alt="movie-list" />
      </Card>
      <div className="circular-progress-movie">
        <CircularProgress rating={explore.vote_average.toFixed(1)} />
      </div>
      <Text fw={700} size={isSmallerThanTable ? 14 : 18}>
        {(() => {
          const label = explore.title || explore.name || "";
          return label.length > 20 ? `${label.substring(0, 20)}...` : label;
        })()}
      </Text>
      <Text size={isSmallerThanTable ? 12 : 16}>
        {releaseDate ? dayjs(releaseDate).format("D-MM-YYYY") : "—"}
      </Text>
    </>
  );
};

export default MovieCard;
