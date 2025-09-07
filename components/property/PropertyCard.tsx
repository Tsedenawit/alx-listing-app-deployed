import Image from "next/image";
import { PropertyProps } from "@/interfaces";

type Props = {
  property: PropertyProps;
};

const PropertyCard = ({ property }: Props) => {
  const { name, images, rating, address, price } = property;

  return (
    <div className="border rounded overflow-hidden shadow-md hover:shadow-lg transition">
      {/* Use next/image if image is a remote URL and configured in next.config.js */}
      <div className="relative h-48 w-full">
        <Image
          src={images && images.length > 0 ? images[0] : "https://placehold.co/600x400"}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 25vw"
          priority={false}
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold">{name}</h3>
          {typeof rating !== "undefined" && (
            <span className="text-sm bg-yellow-100 px-2 rounded">{rating} ★</span>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-2">
          {address?.city}{address?.city && address?.country ? ", " : ""}{address?.country}
        </p>

        {typeof price !== "undefined" && (
          <p className="font-semibold">
            ${Number(price).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;