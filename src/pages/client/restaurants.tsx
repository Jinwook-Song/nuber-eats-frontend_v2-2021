import { gql, useQuery } from "@apollo/client";
import AllRestaurants from "../../components/all-restaurants";
import Banner from "../../components/banner";
import Category from "../../components/category";
import {
  RestaurantsPageQuery,
  RestaurantsPageQueryVariables,
} from "../../__generated__/RestaurantsPageQuery";

const RESTAURANTS_QUERY = gql`
  query RestaurantsPageQuery($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        id
        name
        coverImg
        slug
        restaurantCount
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        id
        name
        coverImg
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
`;

function Restaurants() {
  const { data, loading } = useQuery<
    RestaurantsPageQuery,
    RestaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page: 1,
      },
    },
  });

  console.log(data, loading);
  return (
    <>
      <Banner />
      {!loading && (
        <div className="px-4 xl:px-2 max-w-screen-xl mx-auto mt-10 flex flex-col">
          <h3 className="text-4xl font-bold mb-5">Explore by category</h3>
          <div className="grid w-3/4 self-center sm:grid-cols-2 sm:w-full  md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data?.allCategories.categories?.map(({ name, coverImg }) => (
              <Category key={name} name={name} coverImg={coverImg} />
            ))}
          </div>

          <hr className="m-10 w-full self-center" />

          <h3 className="text-4xl font-bold mb-5">Restaurants</h3>
          <div className="cursor-pointer grid md:grid-cols-2 xl:grid-cols-3 gap-4 mb-10 ">
            {data?.restaurants.results?.map(
              ({ coverImg, name, category, address }, index) => (
                <AllRestaurants
                  key={index}
                  coverImg={coverImg}
                  name={name}
                  category={category}
                  address={address}
                />
              )
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Restaurants;
