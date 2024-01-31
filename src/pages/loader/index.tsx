import { Flex, Loader } from "@mantine/core";

const Loading = () => {
  return (
    <Flex h={"100vh"} justify={"center"} align={"center"}>
      <Loader />
    </Flex>
  );
};

export default Loading;
