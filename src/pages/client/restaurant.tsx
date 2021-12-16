import { useNavigate, useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import Spacing from "../../components/spacing";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import {
  RestaurantInfo,
  RestaurantInfoVariables,
} from "../../__generated__/RestaurantInfo";
import { Helmet } from "react-helmet-async";
import Loading from "../../components/loading";

const RESTAURANT_QUERY = gql`
  query RestaurantInfo($input: RestaurantInput!) {
    restaurant(input: $input) {
      error
      ok
      restaurant {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

function Restaurant() {
  const navigate = useNavigate();
  const params = useParams();
  const { loading, data } = useQuery<RestaurantInfo, RestaurantInfoVariables>(
    RESTAURANT_QUERY,
    {
      variables: {
        input: {
          restaurantId: +params.id!,
        },
      },
    }
  );

  if (!data || loading) {
    return <Loading />;
  }

  return (
    <>
      <Spacing />
      <div>
        <Helmet>
          <title>{data?.restaurant.restaurant?.name || ""} | Uuber Eats</title>
        </Helmet>
        {!loading && (
          <div
            className="bg-center bg-cover h-96 flex flex-col justify-end p-5 relative"
            style={{
              color: "#CBCBCB",
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9)), url(${data?.restaurant.restaurant?.coverImg})`,
            }}
          >
            <span
              className="absolute top-0 py-3 text-2xl font-semibold  cursor-pointer "
              onClick={() => navigate(-1)}
            >
              &larr;
            </span>

            <h4 className="text-base sm:text-2xl xl:text-4xl mb-3">
              {data?.restaurant.restaurant?.name} •{" "}
              {data?.restaurant.restaurant?.category?.name}
            </h4>
            <h6 className="text-sm sm:text-xl xl:text:2xl font-light">
              {data?.restaurant.restaurant?.address}
            </h6>
          </div>
        )}
      </div>
    </>
  );
}

export default Restaurant;
