import { FC } from "react";
import { Link } from "react-router-dom";
import { NcImage } from "../../atoms";

export interface CardCategoryProps {
  className?: string;
  featuredImage?: string;
}

const CardCategory: FC<CardCategoryProps> = ({
  className = "",
  featuredImage = "",
}) => {
  return (
    <div
      className={`nc-CardNFTMusic2 mb-10 relative flex justify-between p-2 space-x-2 rounded-3xl bg-neutral-100 dark:bg-neutral-800 hover:shadow-xl transition-shadow ${className}`}
      data-nc-id="CardNFTMusic2">
      <Link to={"/nft-detailt"} className="flex-grow flex">
        <div className="relative w-12 h-12 sm:w-12 mr-2">
          <NcImage
            className="object-cover w-12 h-12"
            containerClassName="absolute inset-0 rounded-2xl overflow-hidden shadow-lg "
            src={featuredImage}
          />
        </div>

        <div className="flex flex-col justify-center flex-grow">
          <h2 className={`block font-medium md:text-sm`}>NFT music</h2>
          <h2 className={`text-gray-400 block font-medium text-xs`}>
            #deskripsi
          </h2>
        </div>
      </Link>
    </div>
  );
};

export default CardCategory;
