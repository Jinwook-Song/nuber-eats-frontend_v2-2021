import { gql, useQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { faBars, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import AllRestaurants from "../../components/all-restaurants";
import Banner from "../../components/banner";
import AllCategories from "../../components/all-categories";
import {
  RestaurantsPageQuery,
  RestaurantsPageQueryVariables,
} from "../../__generated__/RestaurantsPageQuery";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import { useLocation } from "react-router-dom";

const RESTAURANTS_QUERY = gql`
  query RestaurantsPageQuery($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        ...CategoryParts
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

function Restaurants() {
  const [page, setPage] = useState(1);
  const [showAllCategory, setShowAllCategory] = useState(false);
  const location = useLocation();
  console.log(location);
  const { data, loading } = useQuery<
    RestaurantsPageQuery,
    RestaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page,
      },
    },
  });

  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);

  return (
    <>
      <div className="h-screen">
        <Banner />
      </div>
      <Helmet>
        <title>Uber Eats</title>
      </Helmet>
      {!loading && (
        <div className="px-4 xl:px-2 max-w-screen-xl mx-auto mt-10 flex flex-col">
          <h3 className="text-2xl sm:text-4xl font-bold mb-5">
            Explore by category
            <FontAwesomeIcon
              onClick={() => setShowAllCategory((prev) => !prev)}
              icon={showAllCategory ? faSortDown : faBars}
              className="text-xl sm:text-3xl ml-4 cursor-pointer"
            />
          </h3>
          <div
            className="grid w-3/4 self-center sm:grid-cols-2 sm:w-5/6  md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-hidden"
            style={{ height: showAllCategory ? "auto" : "7rem" }}
          >
            {data?.allCategories.categories?.map(({ name, coverImg, slug }) => (
              <AllCategories
                key={name}
                name={name}
                coverImg={coverImg}
                slug={slug}
              />
            ))}
          </div>

          <hr className="m-10 w-full self-center" />

          <h3 className="text-2xl sm:text-4xl font-bold mb-5">Restaurants</h3>
          <div className="cursor-pointer grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {data?.restaurants.results?.map(
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
              Page {page} of {data?.restaurants.totalPages}
            </span>
            {page !== data?.restaurants.totalPages ? (
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

          <hr className="m-10 w-full self-center" />
        </div>
      )}
    </>
  );
}

export default Restaurants;
