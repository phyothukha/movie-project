import { useParams } from "react-router-dom";
import {
  Group,
  Flex,
  Container,
  Title,
  Loader,
  Pagination,
  Grid,
} from "@mantine/core";
import { useState } from "react";
import { useQuery } from "react-query";
import Select, { ActionMeta, MultiValue, SingleValue } from "react-select";
import makeAnimated from "react-select/animated";
import { useMediaQuery } from "@mantine/hooks";
import {
  GeneresProps,
  GenreTypeProps,
  sortDataType,
} from "@/types/MovieDetail/Detail";
import fetchDataFromApi from "@/api";
import { movieType } from "@/types/MovieType/movietype";
import Layout from "@/layout/Layout";
import { colourStyles, colourStyles2 } from "@/styles/UseSelectOption";
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
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<sortDataType | null>();

  //fetch-data genre
  const { data: GenreData } = useQuery<GenreTypeProps>({
    queryKey: ["genre-data", mediatype],
    queryFn: () => fetchDataFromApi(`/genre/${mediatype}/list`),
  });

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
      console.log(newValue);
      console.log(sortBy);
    } else {
      setSortBy(null);
    }
  };

  //fetch-data explore
  const { data: ExploreData, isLoading } = useQuery<movieType>({
    queryKey: ["explore-data", mediatype, page, genre, sortBy?.value],
    queryFn: () =>
      fetchDataFromApi(
        `/discover/${mediatype}?page=${page}&with_genres=${genre}${
          sortBy ? `&sort_by=${sortBy.value}` : ""
        }`
      ),
    keepPreviousData: true,
  });

  //pagination function
  const handlePageChange = (newpage: number) => {
    setPage(newpage);
  };

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
          <Grid>
            {ExploreData?.results?.map((explore, index) => (
              <Grid.Col
                key={index}
                span={isSmallestTable ? 6 : isSmallerThanTable ? 4 : 2}
                my={20}
              >
                <MovieCard explore={explore} mediatype={mediatype} />
              </Grid.Col>
            ))}
          </Grid>
        )}

        <Flex justify="end" my={20}>
          <Pagination
            total={ExploreData?.total_pages || 0}
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

export default Explore;
