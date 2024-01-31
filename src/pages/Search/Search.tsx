import {
  Container,
  Flex,
  Grid,
  Loader,
  Pagination,
  Title,
} from "@mantine/core";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { movieType } from "@/types/MovieType/movietype";
import fetchDataFromApi from "@/api";
import Layout from "@/layout/Layout";
import MovieCard from "@/components/MovieCard/MovieCard";

const Search = () => {
  const [page, setPage] = useState<number>(1);
  const { query } = useParams();
  const isSmallerThanTable = useMediaQuery("(max-width:768px)");
  const isSmallestTable = useMediaQuery("(max-width:420px)");
  const { data: Searchdata, isLoading } = useQuery<movieType>({
    queryKey: ["search-data", query, page],
    queryFn: () => fetchDataFromApi(`search/multi?query=${query}&page=${page}`),
  });
  console.log(Searchdata);
  if (isLoading) {
    console.log("hello");
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <Layout>
      <Container size={"lg"}>
        <Flex my={20}>
          <Title size={20}>Search Result :{query}</Title>
        </Flex>
        {isLoading ? (
          <Flex h="100vh" justify="center" align="center">
            <Loader />
          </Flex>
        ) : (
          <Grid>
            {Searchdata?.results?.map((explore, index) => {
              if (explore.media_type === "person") return;
              return (
                <Grid.Col
                  key={index}
                  span={isSmallestTable ? 6 : isSmallerThanTable ? 4 : 2}
                  my={20}
                >
                  <MovieCard
                    explore={explore}
                    mediatype={explore?.media_type}
                  />
                </Grid.Col>
              );
            })}
          </Grid>
        )}
        <Flex justify="end" my={20}>
          <Pagination
            total={Searchdata?.total_pages || 0}
            value={page}
            onChange={handlePageChange}
            position="center"
            styles={() => ({
              control: {
                "&[data-active]": {
                  background: "#173d77",
                  border: 0,
                },
              },
            })}
          />
        </Flex>
      </Container>
    </Layout>
  );
};

export default Search;
