import { useParams, useNavigate } from "react-router-dom";
import { gql, useLazyQuery } from "@apollo/client";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import { Category, CategoryVariables } from "../../__generated__/Category";
import AllRestaurants from "../../components/all-restaurants";
import Banner from "../../components/banner";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import NotFound from "../404";

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
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("Category");
  const params = useParams();
  const navigate = useNavigate();

  const [callQuery, { data, loading }] = useLazyQuery<
    Category,
    CategoryVariables
  >(CATEGORY_QUERY);

  useEffect(() => {
    if (!params) {
      return navigate("/", { replace: true });
    }
    const slug = decodeURIComponent(params.slug as string);
    setCategory(slug);

    callQuery({
      variables: {
        input: {
          page,
          slug,
        },
      },
    });
  }, [callQuery, navigate, page, params]);

  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);

  return (
    <>
      {data?.category.totalResults ? (
        <>
          <Helmet>
            <title>{category.toUpperCase()} | Uber Eats</title>
          </Helmet>
          <div className="h-72">
            <Banner searchPage={true} />
          </div>
          {!loading && (
            <div className="px-4 xl:px-2 max-w-screen-xl mx-auto mt-10 flex flex-col">
              {data?.category.totalResults ? (
                <>
                  <h3 className="text-2xl sm:text-4xl font-bold mb-5">
                    {data.category.totalResults === 1
                      ? "1 restaurant is"
                      : `${data.category.totalResults} restaurants are`}{" "}
                    serviced in <br className="sm:hidden" />"{category}".
                  </h3>
                  <hr className="m-10 w-full self-center" />
                  <div className="cursor-pointer grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {data?.category.restaurants?.map(
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
                      Page {page} of {data?.category.totalPages}
                    </span>
                    {page !== data?.category.totalPages ? (
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
              ) : null}
              <hr className="m-10 w-full self-center" />
            </div>
          )}
        </>
      ) : (
        <>{!loading && <NotFound />}</>
      )}
    </>
  );
}

export default CategoryRestauratns;
