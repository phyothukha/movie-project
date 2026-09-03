import {
  Container,
  Flex,
  Grid,
  Image,
  Loader,
  Text,
  Title,
} from "@mantine/core";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useMediaQuery, useIntersection } from "@mantine/hooks";
import { movieType } from "@/types/MovieType/movietype";
import fetchDataFromApi from "@/api";
import Layout from "@/layout/Layout";
import MovieCard from "@/components/MovieCard/MovieCard";
import noResults from "@/assets/no-results.png";

const Search = () => {
  const { query } = useParams();
  const isSmallerThanTable = useMediaQuery("(max-width:768px)");
  const isSmallestTable = useMediaQuery("(max-width:420px)");

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<movieType>({
      queryKey: ["search-data", query],
      queryFn: ({ pageParam }) =>
        fetchDataFromApi("search/multi", { query, page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
      enabled: Boolean(query),
    });

  const { ref: sentinelRef, entry } = useIntersection({
    threshold: 0.1,
  });

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [entry?.isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const seenKeys = new Set<string>();
  const results =
    data?.pages
      .flatMap((p) => p.results)
      .filter((item) => {
        if (item.media_type === "person") return false;
        const key = `${item.media_type}-${item.id}`;
        if (seenKeys.has(key)) return false;
        seenKeys.add(key);
        return true;
      }) ?? [];
  const hasNoResults = !isLoading && results.length === 0;

  return (
    <Layout>
      <Container size={"lg"}>
        <Flex my={20}>
          <Title size={20}>Search Results for "{query}"</Title>
        </Flex>
        {isLoading ? (
          <Flex h="100vh" justify="center" align="center">
            <Loader />
          </Flex>
        ) : hasNoResults ? (
          <Flex direction="column" align="center" gap={10} my={60}>
            <Image
              src={noResults}
              alt="No results found"
              width={220}
              fit="contain"
            />
            <Text size={18} fw={600}>
              No results found for "{query}"
            </Text>
            <Text size={14} c="dimmed">
              Try checking your spelling or searching for something else.
            </Text>
          </Flex>
        ) : (
          <>
            <Grid>
              {results.map((explore) => (
                <Grid.Col
                  key={`${explore.media_type}-${explore.id}`}
                  span={isSmallestTable ? 6 : isSmallerThanTable ? 4 : 2}
                  my={20}
                >
                  <MovieCard
                    explore={explore}
                    mediatype={explore?.media_type}
                  />
                </Grid.Col>
              ))}
            </Grid>
            <div ref={sentinelRef} />
            {isFetchingNextPage && (
              <Flex justify="center" my={20}>
                <Loader size="sm" />
              </Flex>
            )}
            {!hasNextPage && (
              <Flex justify="center" my={20}>
                <Text size={14} c="dimmed">
                  You've reached the end of the results.
                </Text>
              </Flex>
            )}
          </>
        )}
      </Container>
    </Layout>
  );
};

export default Search;
