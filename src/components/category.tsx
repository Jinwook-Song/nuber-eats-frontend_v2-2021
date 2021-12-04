import american from "../images/categories/american.png";
import { RestaurantsPageQuery_allCategories_categories } from "../__generated__/RestaurantsPageQuery";

function Category({
  name,
  coverImg,
}: Partial<RestaurantsPageQuery_allCategories_categories>) {
  return (
    <div className="w-5/6 h-24 grid grid-cols-3 relative cursor-pointer bg-yellow-50 hover:bg-yellow-100 transition-colors">
      <h5 className="p-3 font-medium text-xl col-span-2 capitalize hover:underline ">
        {name}
      </h5>
      <img
        className="bg-center bg-cover	w-20 h-20 rounded-full absolute -right-2 -bottom-2"
        src={coverImg ? coverImg : american}
        alt={name}
      />
    </div>
  );
}

export default Category;
