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
        backgroundColor: color,
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      {/* <img src={image} alt="banner" /> */}
    </div>
  );
}

export default Banner;
