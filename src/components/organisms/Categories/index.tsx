import Glide from "@glidejs/glide";
import { FC, useEffect, useId, useRef } from "react";
import { Heading } from "../../atoms";
import { CardCategory } from "../../molecules";

export interface SectionSliderCategoriesProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  subHeading?: string;
}

const Categories: FC<SectionSliderCategoriesProps> = ({
  heading = "Kategori",
  subHeading = "Explore categories.",
  className = "",
  itemClassName = "",
}) => {
  const sliderRef = useRef(null);
  const id = useId();
  const UNIQUE_CLASS = "glidejs" + id.replace(/:/g, "_");

  useEffect(() => {
    if (!sliderRef.current) {
      return;
    }

    let slider = new Glide(`.${UNIQUE_CLASS}`, {
      perView: 6,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          perView: 4,
        },
        1024: {
          gap: 20,
          perView: 3.4,
        },
        768: {
          gap: 20,
          perView: 3,
        },
        640: {
          gap: 20,
          perView: 2.3,
        },
        500: {
          gap: 20,
          perView: 1.4,
        },
      },
    });
    slider.mount();
  }, [sliderRef, UNIQUE_CLASS]);

  return (
    <div className={`nc-SectionSliderCategories ${className}`}>
      <div className={`${UNIQUE_CLASS} flow-root`} ref={sliderRef}>
        <Heading desc={subHeading} hasNextPrev>
          {heading}
        </Heading>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {[1, 1, 1, 1, 1, 1].map((item, index) => (
              <li key={index} className={`glide__slide ${itemClassName}`}>
                <CardCategory
                  // index={index}
                  featuredImage={`https://www.static-src.com/siva/asset///11_2020/digital-aggr.png`}
                  // name={`${ntfsCatNames[index]}`}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Categories;
