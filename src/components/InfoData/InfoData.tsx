import { Flex, Text } from "@mantine/core";
import { FC } from "react";

interface InfoDataType {
  label: string;
  value: string[];
}

const InfoData: FC<InfoDataType> = ({ label, value }) => {
  return (
    <Flex
      gap={10}
      style={{
        flexFlow: "row wrap",
      }}
    >
      <Text size={16} fw={700} color="white">
        {label}:
      </Text>
      {value.map((val, index) => (
        <Text key={index} opacity={0.8} fw={500}>
          {val}
          {val.length - 1 !== index && ","}
        </Text>
      ))}
    </Flex>
  );
};

export default InfoData;
