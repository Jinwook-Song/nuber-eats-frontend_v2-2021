import american from "../images/categories/american.png";
import { RestaurantsPageQuery_allCategories_categories } from "../__generated__/RestaurantsPageQuery";
import {Link} from 'react-router-dom'

function AllCategories({
  name,
  coverImg,
  slug
}: Partial<RestaurantsPageQuery_allCategories_categories>) {
  return (
    <Link to={`/category/${slug}`}>
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
    </Link>

  );
}

export default AllCategories;
