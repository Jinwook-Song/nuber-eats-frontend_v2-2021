import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import Spacing from "../../components/spacing";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import { Category, CategoryVariables } from "../../__generated__/Category";

const CATEGORY_QUERY = gql`
  query Category($input: CategoryInput!) {
    category(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
      category {
        ...CategoryParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

function CategoryRestauratns() {
  const { slug } = useParams();

  const { data, loading } = useQuery<Category, CategoryVariables>(
    CATEGORY_QUERY,
    {
      variables: {
        input: {
          slug: slug!,
        },
      },
    }
  );

  console.log(data, loading);

  return (
    <>
      <Spacing />
      <div>{data?.category.totalResults} restaurants.</div>
    </>
  );
}

export default CategoryRestauratns;
