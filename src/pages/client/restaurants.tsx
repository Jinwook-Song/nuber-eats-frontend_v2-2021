import { gql, useQuery } from "@apollo/client";
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
            {data?.restaurants.results?.map((restaurant) => (
              <div className="w-full h-40 grid grid-cols-5 overflow-hidden">
                <img
                  className="col-span-3 w-full h-full"
                  src={restaurant.coverImg}
                  style={{
                    backgroundSize: "cover",
                    backgroundPosition: "right top",
                  }}
                  alt={restaurant.name}
                />
                <div className="col-span-2 ml-3 flex flex-col">
                  <h5 className="font-bold text-lg">{restaurant.name}</h5>
                  <span className="opacity-70 mb-1 font-light capitalize">
                    {restaurant.category?.name}
                  </span>
                  <span className="opacity-70 font-light">
                    {restaurant.address}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Restaurants;
