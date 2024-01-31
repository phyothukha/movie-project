import { FC } from "react";
import { CircularProgressbar } from "react-circular-progressbar";

interface rateProps {
  rating?: string;
}

const CircularProgress: FC<rateProps> = ({ rating }) => {
  if (rating !== undefined) {
    const rate = Number(rating);
    return (
      <CircularProgressbar
        value={rate}
        maxValue={10}
        text={rating}
        styles={{
          path: {
            stroke: rate < 5 ? "red" : rate < 7 ? "orange" : "green",
            strokeLinecap: "round",
          },
          text: {
            fontSize: 34,
            fontWeight: 700,
            fill: "#04152dff",
            textAnchor: "middle",
            dominantBaseline: "middle",
          },
          trail: {
            stroke: "transparent",
          },
        }}
      />
    );
  }
};

export default CircularProgress;
