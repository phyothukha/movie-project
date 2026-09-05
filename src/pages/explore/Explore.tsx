import { useParams } from "react-router-dom";
import {
  Group,
  Flex,
  Container,
  Title,
  Loader,
  Text,
  Grid,
} from "@mantine/core";
import { useEffect, useState } from "react";
import Select, { ActionMeta, MultiValue, SingleValue } from "react-select";
import makeAnimated from "react-select/animated";
import { useMediaQuery, useIntersection } from "@mantine/hooks";
import { GeneresProps } from "@/store/server/genres/interface";
import { sortDataType } from "@/store/server/discover/interface";
import { useGetGenres } from "@/store/server/genres/queries";
import { useDiscoverByType } from "@/store/server/discover/queries";
import Layout from "@/layout/Layout";
import { colourStyles, colourStyles2 } from "@/styles/SelectOptionStyle";
import MovieCard from "@/components/MovieCard/MovieCard";

const animatedComponents = makeAnimated();

const sortbyData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  {
    value: "primary_release_date.desc",
    label: "Release Date Descending",
  },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

const Explore = () => {
  const { mediatype } = useParams();
  const isSmallerThanTable = useMediaQuery("(max-width:768px)");
  const isSmallestTable = useMediaQuery("(max-width:420px)");
  //chage-data
  const [genre, setGenre] = useState<number[]>();
  const [sortBy, setSortBy] = useState<sortDataType | null>();

  //fetch-data genre
  const { data: GenreData } = useGetGenres(mediatype);

  //genre-change function

  const hadleChange = (
    selectedItems: MultiValue<GeneresProps>,
    action: ActionMeta<GeneresProps>
  ) => {
    const genreIds =
      action.action !== "clear" ? selectedItems.map((genre) => genre.id) : [];
    setGenre(genreIds);
  };
  const handleselectChnage = (
    newValue: sortDataType,
    action: ActionMeta<sortDataType>
  ) => {
    if (action.action !== "clear") {
      setSortBy(newValue);
    } else {
      setSortBy(null);
    }
  };

  const {
    data: ExploreData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useDiscoverByType(mediatype, {
    genreIds: genre,
    sortBy: sortBy?.value,
  });

  const { ref: sentinelRef, entry } = useIntersection({
    threshold: 0.1,
  });

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [entry?.isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const results = ExploreData?.pages.flatMap((p) => p.results) ?? [];

  return (
    <Layout>
      <Container size={"lg"}>
        <Flex
          justify={"space-between"}
          style={{
            flexFlow: "row wrap",
          }}
          my={20}
        >
          <Title size={20} my={20} align="center">
            {mediatype === "tv" ? "Explore TV Shows" : "Explore Movies"}
          </Title>
          <Group>
            <Select
              isMulti={true}
              name={"genres"}
              closeMenuOnSelect={false}
              options={GenreData?.genres}
              getOptionValue={(Option: GeneresProps) => Option.id.toString()}
              getOptionLabel={(option: GeneresProps) => option.name}
              onChange={hadleChange}
              components={animatedComponents}
              isClearable={true}
              styles={colourStyles}
              placeholder="Select genres"
            />
            <Select
              name="sort-by-data"
              options={sortbyData}
              onChange={
                handleselectChnage as (
                  newValue:
                    | SingleValue<sortDataType>
                    | MultiValue<sortDataType>,
                  actionMeta: ActionMeta<sortDataType>
                ) => void
              }
              isClearable={true}
              styles={colourStyles2}
              placeholder="Sort By"
            />
          </Group>
        </Flex>
        {isLoading ? (
          <Flex h="100vh" justify="center" align="center">
            <Loader />
          </Flex>
        ) : (
          <>
            <Grid>
              {results.map((explore) => (
                <Grid.Col
                  key={explore.id}
                  span={isSmallestTable ? 6 : isSmallerThanTable ? 4 : 2}
                  my={20}
                >
                  <MovieCard explore={explore} mediatype={mediatype} />
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

export default Explore;
