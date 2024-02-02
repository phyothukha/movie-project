import { Routes, Route } from "react-router-dom";
// import { useQuery } from "react-query";
import { configuretype } from "./types/Configure/configuration";
// import useHomeStore from "./store/client/movieslice";
// import { Suspense } from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import fetchDataFromApi from "./api";
import Loading from "./pages/loader";
import { useQuery } from "@tanstack/react-query";
// import Detail from "./pages/Detail/Detail";
// const Dashboard = lazy(() => import("@/pages/Dashboard/Dashboard"));
// const Detail = lazy(() => import("@/pages/Detail/Detail"));
// const Search = lazy(() => import("@/pages/Search/Search"));
// const CastDetail = lazy(() => import("@/pages/CastDetail.tsx/CastDetail"));
// const Explore = lazy(() => import("@/pages/explore/Explore"));

export default function App() {
  // const setApiConfiguration = useHomeStore(
  //   (state) => state.setApiConfiguration
  // );

  const { isFetching, isLoading } = useQuery<configuretype>({
    queryKey: ["configure"],
    queryFn: () => fetchDataFromApi("/configuration"),
    refetchOnWindowFocus: false,
    // onSuccess: (data) => {
    //   setApiConfiguration({
    //     backdrop: data?.images.secure_base_url + "original",
    //     poster: data?.images.secure_base_url + "original",
    //     profile: data?.images.secure_base_url + "original",
    //   });
    // },
  });

  if (isFetching && isLoading) <Loading />;
  return (
    // <Suspense fallback={<Loading />}>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      {/* <Route path="/:mediatype/:id" element={<Detail />} />
        <Route path="/explore/:mediatype" element={<Explore />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path="/cast/:castId" element={<CastDetail />} /> */}
    </Routes>
    // </Suspense>
  );
}
