import { Routes, Route } from "react-router-dom";
import { useQuery } from "react-query";
import { Flex, Loader } from "@mantine/core";
import { configuretype } from "./types/Configure/configuration";
import useHomeStore from "./store/movieslice";
import fetchDataFromApi from "./api";
import Dashboard from "./pages/Dashboard/Dashboard";
import Detail from "./pages/Detail/Detail";
import Search from "./pages/Search/Search";
import CastDetail from "./pages/CastDetail.tsx/CastDetail";
import Explore from "./pages/explore/Explore";

export default function App() {
  const setApiConfiguration = useHomeStore(
    (state) => state.setApiConfiguration
  );

  const { isFetching } = useQuery<configuretype>({
    queryKey: "configure",
    queryFn: () => fetchDataFromApi("/configuration"),
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setApiConfiguration({
        backdrop: data?.images.secure_base_url + "original",
        poster: data?.images.secure_base_url + "original",
        profile: data?.images.secure_base_url + "original",
      });
    },
  });

  if (isFetching) {
    return (
      <Flex h={"100vh"} justify={"center"} align={"center"}>
        <Loader />
      </Flex>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/:mediatype/:id" element={<Detail />} />
      <Route path="/explore/:mediatype" element={<Explore />} />
      <Route path="/search/:query" element={<Search />} />
      <Route path="/cast/:castId" element={<CastDetail />} />
    </Routes>
  );
}
