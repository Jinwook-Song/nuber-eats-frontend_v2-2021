import { gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import AllRestaurants from "../../components/all-restaurants";
import Banner from "../../components/banner";
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
  const [page, setPage] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  const term = location.search.split("?term=")[1];
  const query = decodeURIComponent(term);

  const [callQuery, { loading, data }] = useLazyQuery<
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
          page,
          query,
        },
      },
    });
  }, [navigate, query, callQuery, page]);

  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);

  return (
    <>
      <Helmet>
        <title>Search | Uber Eats</title>
      </Helmet>
      <div className="h-72">
        <Banner searchPage={true} />
      </div>
      {!loading && (
        <div className="px-4 xl:px-2 max-w-screen-xl mx-auto mt-10 flex flex-col">
          {data?.searchRestaurant.totalResults ? (
            <>
              <h3 className="text-2xl sm:text-4xl font-bold mb-5">
                {data.searchRestaurant.totalResults === 1
                  ? "1 Restaurant"
                  : `${data.searchRestaurant.totalResults} Restaurants`}{" "}
                Found.
              </h3>
              <hr className="m-10 w-full self-center" />
              <div className="cursor-pointer grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {data?.searchRestaurant.restaurants?.map(
                  ({ id, coverImg, name, category, address }) => (
                    <AllRestaurants
                      key={id.toString()}
                      id={id}
                      coverImg={coverImg}
                      name={name}
                      category={category}
                      address={address}
                    />
                  )
                )}
              </div>
              <div className="grid grid-cols-3 text-center max-w-md items-center mx-auto mt-10">
                {page > 1 ? (
                  <button
                    onClick={onPrevPageClick}
                    className="focus:outline-none font-medium text-2xl"
                  >
                    &larr;
                  </button>
                ) : (
                  <div></div>
                )}
                <span>
                  Page {page} of {data?.searchRestaurant.totalPages}
                </span>
                {page !== data?.searchRestaurant.totalPages ? (
                  <button
                    onClick={onNextPageClick}
                    className="focus:outline-none font-medium text-2xl"
                  >
                    &rarr;
                  </button>
                ) : (
                  <div></div>
                )}
              </div>
            </>
          ) : (
            <>
              <h3 className="text-2xl sm:text-4xl font-bold mb-5">
                We didn’t find a match for "{query}"
              </h3>
              <span className="text-lg sm:text-2xl opacity-50">
                Try searching for something else instead
              </span>
            </>
          )}
          <hr className="m-10 w-full self-center" />
        </div>
      )}
    </>
  );
}

export default Search;
