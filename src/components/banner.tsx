import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Bg_01 from "../images/Bg_01.svg";
import Bg_02 from "../images/Bg_02.svg";
import Bg_03 from "../images/Bg_03.svg";
import Bg_04 from "../images/Bg_04.svg";

const images = [Bg_01, Bg_02, Bg_03, Bg_04];
const colors = ["#FFC043", "#FA9269", "#FFF2D9", "#FFD7D2"];

interface IFormProps {
  searchingBy: string;
}

function Banner() {
  const randomGen = Math.floor(Math.random() * 4) + 1;
  const image = images[randomGen];
  const color = colors[randomGen];

  const navigate = useNavigate();

  const { register, handleSubmit, getValues } = useForm<IFormProps>();
  const onSearchSubmit = () => {
    const { searchingBy } = getValues();
    navigate(`/search?term=${searchingBy}`);
  };
  return (
    <div
      className="w-full h-screen"
      style={{
        backgroundColor: color ? color : "#FFC043",
        backgroundImage: `url(${image ? image : Bg_01})`,
        backgroundSize: "cover",
        backgroundPosition: "right top",
      }}
    >
      <div className="px-4 xl:px-2 max-w-screen-xl mx-auto pt-96 flex flex-col">
        <h2 className="text-5xl font-bold pb-10">Order food to your door</h2>
        <form onSubmit={handleSubmit(onSearchSubmit)} className="flex">
          <input
            {...register("searchingBy", { required: true })}
            type="Search"
            placeholder="Search Restaurants..."
            className="w-full md:w-3/4 mr-3 p-3 focus:outline-none border-b-2 focus:border-black transition-colors"
          />
          <button className="px-5 py-3 bg-black whitespace-nowrap text-white text-extrabold hover:opacity-80">
            Find Food
          </button>
        </form>
      </div>
    </div>
  );
}

export default Banner;
