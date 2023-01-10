
import { Categories, ImageCarousel } from "../../../components";

const carouselSlidesData = [
  {
    content:
      "Tomorrow, you will be released. If you are bored of brawling with thieves and want to achieve something there is a rare blue flower that grows on the eastern slopes. Pick one of these flowers. If you can carry it to the top of the mountain, you may find what you were looking for in the first place.",
    author: "Bane",
    source: "facebook",
    image:
      "https://www.static-src.com/siva/asset//07_2022/Blibli-Anniv---Daily-KV-27-Jul_CarouselWeb.jpg?w=960",
  },
  {
    content:
      "You have learn to bury your guilt with anger. I will teach you to confront it and to face the truth.",
    author: "Ra's Al Ghul",
    source: "Snapchat",
    image:
      "https://www.static-src.com/siva/asset//07_2022/prochiz-BLM-ANNIV-jul22-carousel-desktop.jpg?w=960",
  },
];

export default function Home() {
  return (
    <>
      <div className="nc-PageHome relative overflow-hidden">
        <ImageCarousel slides={carouselSlidesData} />
        <div className="container relative mt-3 md:mt-6">
          <Categories />
        </div>
      </div>
    </>
  );
}
