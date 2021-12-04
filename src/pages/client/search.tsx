import { gql, useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import Spacing from "../../components/spacing";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import {
  SearchRestaurant,
  SearchRestaurantVariables,
} from "../../__generated__/SearchRestaurant";

const SEARCH_RESTAURANT_QUERY = gql`
  query SearchRestaurant($input: SearchRestaurantInput!) {
    searchRestaurant(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = location.search.split("?term=")[1];

  const [callQuery, { loading, data, called }] = useLazyQuery<
    SearchRestaurant,
    SearchRestaurantVariables
  >(SEARCH_RESTAURANT_QUERY);

  useEffect(() => {
    if (!query) {
      return navigate("/", { replace: true });
    }
    callQuery({
      variables: {
        input: {
          query,
        },
      },
    });
  }, [navigate, query, callQuery]);

  console.log(loading, data, called);

  return (
    <>
      <Spacing />
      <Helmet>
        <title>Search | Uber Eats</title>
      </Helmet>
      <div>Searching by: {query}</div>
      <span>Found {data?.searchRestaurant.totalResults} Restaurants.</span>
    </>
  );
}

export default Search;
