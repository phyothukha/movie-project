import { Routes, Route } from "react-router-dom";
import { Flex, Loader } from "@mantine/core";
import useHomeStore from "./store/movieslice";
import { useGetConfiguration } from "./store/server/configuration/queries";
import { Suspense, lazy, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const Dashboard = lazy(() => import("@/pages/Dashboard/Dashboard"));
const Detail = lazy(() => import("@/pages/Detail/Detail"));
const Search = lazy(() => import("@/pages/Search/Search"));
const CastDetail = lazy(() => import("@/pages/CastDetail/CastDetail"));
const Explore = lazy(() => import("@/pages/explore/Explore"));

export default function App() {
  const setApiConfiguration = useHomeStore(
    (state) => state.setApiConfiguration
  );

  const { data: configData, isFetching } = useGetConfiguration();

  useEffect(() => {
    if (!configData) return;
    setApiConfiguration({
      backdrop: configData.images.secure_base_url + "original",
      poster: configData.images.secure_base_url + "original",
      profile: configData.images.secure_base_url + "original",
    });
  }, [configData, setApiConfiguration]);

  if (isFetching) {
    return (
      <Flex h={"100vh"} justify={"center"} align={"center"}>
        <Loader />
      </Flex>
    );
  }
  return (
    <>
      <Suspense
        fallback={
          <Flex h={"100vh"} justify={"center"} align={"center"}>
            <Loader />
          </Flex>
        }
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/:mediatype/:id" element={<Detail />} />
          <Route path="/explore/:mediatype" element={<Explore />} />
          <Route path="/search/:query" element={<Search />} />
          <Route path="/cast/:castId" element={<CastDetail />} />
        </Routes>
      </Suspense>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
