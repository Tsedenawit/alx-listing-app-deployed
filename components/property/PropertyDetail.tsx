import Image from "next/image";
import type { PropertyProps } from "@/interfaces";

type Props = {
    property: PropertyProps;
};

const isSvg = (url?: string) => typeof url === "string" && url.endsWith(".svg");

export default function PropertyDetail({ property }: Props) {
    const {
        name,
        // string
        images,          // optional: string[] gallery
        rating,
        address,         // { city?: string; country?: string; line1?: string; ... }
        price,           // number
        description,     // string
        amenities,       // string[]
        bedrooms,        // number
        bathrooms,       // number
        size,            // number or string
    } = property as PropertyProps;

    const gallery: string[] = (Array.isArray(images) && images.length) ? images : [];

    return (
        <div className="max-w-5xl mx-auto px-4 py-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{name}</h1>

            <div className="text-gray-600 mb-4">
                {address?.state ? `${address.state}, ` : ""}
                {address?.city}{address?.city && address?.country ? ", " : ""}{address?.country}
            </div>

            {/* Gallery */}
            {gallery.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {gallery.map((src, i) => (
                        <div key={i} className="relative w-full h-64 md:h-72 rounded overflow-hidden">
                            {isSvg(src) ? (
                                <Image src={src} alt={`${name} ${i + 1}`} className="w-full h-full object-cover" />
                            ) : (
                                <Image
                                    src={src}
                                    alt={`${name} ${i + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Quick facts */}
            <div className="flex flex-wrap items-center gap-3 text-sm mb-4">
                {typeof rating !== "undefined" && (
                    <span className="bg-yellow-100 px-2 py-1 rounded">{rating} ★</span>
                )}
                {typeof bedrooms === "number" && <span>{bedrooms} bd</span>}
                {typeof bathrooms === "number" && <span>{bathrooms} ba</span>}
                {size && <span>{size} sq ft</span>}
                {typeof price !== "undefined" && (
                    <span className="font-semibold">${Number(price).toLocaleString()}</span>
                )}
            </div>

            {/* Description */}
            {description && <p className="text-gray-800 leading-relaxed mb-6">{description}</p>}

            {/* Amenities */}
            {Array.isArray(amenities) && amenities.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Amenities</h2>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        {amenities.map((a: string, idx: number) => (
                            <li key={idx}>{a}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
