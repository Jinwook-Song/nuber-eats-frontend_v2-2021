import { gql, useQuery } from "@apollo/client";
import Banner from "../../components/banner";
import {
  RestaurantsPageQuery,
  RestaurantsPageQueryVariables,
} from "../../__generated__/RestaurantsPageQuery";
import american from "../../images/categories/american.png";

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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data?.allCategories.categories?.map((category) => (
              <div
                key={category.name}
                className="w-full h-24 grid grid-cols-3 relative cursor-pointer bg-yellow-50 hover:bg-yellow-100 transition-colors"
              >
                <h5 className="p-3 font-medium text-xl col-span-2 capitalize hover:underline ">
                  {category.name}
                </h5>
                <img
                  className="w-1/3 h-full rounded-full absolute -right-2 -bottom-2"
                  src={category.coverImg ? category.coverImg : american}
                  alt={category.name}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Restaurants;
