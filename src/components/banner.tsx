import Bg_01 from "../images/Bg_01.svg";
import Bg_02 from "../images/Bg_02.svg";
import Bg_03 from "../images/Bg_03.svg";
import Bg_04 from "../images/Bg_04.svg";

const images = [Bg_01, Bg_02, Bg_03, Bg_04];
const colors = ["#FFC043", "#FA9269", "#FFF2D9", "#FFD7D2"];

function Banner() {
  const randomGen = Math.floor(Math.random() * 4) + 1;
  const image = images[randomGen];
  const color = colors[randomGen];

  return (
    <div
      className="w-full h-screen"
      style={{
        backgroundColor: color ? color : "#FFC043",
        backgroundImage: `url(${image ? image : Bg_01})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="px-4 xl:px-2 max-w-screen-xl mx-auto pt-96 flex flex-col">
        <h2 className="text-5xl font-bold pb-10 whitespace-nowrap">
          Order food to your door
        </h2>
        <div className="flex space">
          <input
            placeholder="Restaurants"
            className="w-full mr-3 p-3 focus:outline-none border-b-2 focus:border-black"
          />
          <button className="px-5 py-3 bg-black whitespace-nowrap text-white text-extrabold hover:opacity-80">
            Find Food
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
