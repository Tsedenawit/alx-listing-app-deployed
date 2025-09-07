import axios from "axios";
import Pill from "@/components/Pill";
import { useEffect, useState, useMemo } from "react";
import PropertyCard from "@/components/property/PropertyCard";
import { PropertyProps } from "@/interfaces";

const heroBg = "https://source.unsplash.com/1600x500/?vacation,resort";
const filters = ["Top Villa", "Self Checkin", "Beachfront", "Mountain View", "Pet Friendly"];

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [properties, setProperties] = useState<PropertyProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get<PropertyProps[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/properties`);
        console.log("Fetched properties:", res);
        if (isMounted) setProperties(res.data ?? []);
      } catch (err: unknown) {
        console.error("Error fetching properties:", err);
        if (isMounted) setError("Failed to load properties. Please try again.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProperties();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleFilterClick = (filter: string) => {
    setSelectedFilter((prev) => (prev === filter ? null : filter));
  };

  // If your API returns tags/amenities, this will filter by them.
  const visibleProperties = useMemo(() => {
    if (!selectedFilter) return properties;
    return properties.filter((p) => {
      // Adjust this logic to match your API shape (e.g., p.tags or p.amenities)
      const tags = (p as PropertyProps).tags || (p as PropertyProps).amenities || [];
      return Array.isArray(tags) && tags.some((t: string) => t?.toLowerCase() === selectedFilter.toLowerCase());
    });
  }, [properties, selectedFilter]);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-cover bg-center h-[300px]">
        <div
          className="h-full w-full bg-black bg-opacity-50 flex flex-col justify-center items-center text-white"
          style={{
            backgroundImage: `url('${heroBg}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <h1 className="text-3xl md:text-5xl font-bold">Find your favorite place here!</h1>
          <p className="text-lg mt-2">The best prices for over 2 million properties worldwide.</p>
        </div>
      </section>

      {/* Filters */}
      <section className="my-6 px-4 flex flex-wrap gap-4 justify-center">
        {filters.map((filter) => (
          <Pill
            key={filter}
            label={filter}
            selected={selectedFilter === filter}
            onClick={handleFilterClick}
          />
        ))}
      </section>

      {/* Loading / Error / Empty States */}
      {loading && (
        <section className="px-4 max-w-7xl mx-auto">
          <p className="text-gray-600">Loading...</p>
          {/* Simple skeletons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse border rounded overflow-hidden shadow-md">
                <div className="h-48 w-full bg-gray-200" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 w-2/3" />
                  <div className="h-4 bg-gray-200 w-1/2" />
                  <div className="h-4 bg-gray-200 w-1/3" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {!loading && error && (
        <section className="px-4 max-w-7xl mx-auto">
          <p className="text-red-600">{error}</p>
        </section>
      )}

      {!loading && !error && (
        <section className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {visibleProperties.length === 0 ? (
            <p className="text-gray-600">No properties found{selectedFilter ? ` for “${selectedFilter}”` : ""}.</p>
          ) : (
            visibleProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))
          )}
        </section>
      )}
    </div>
  );
}
