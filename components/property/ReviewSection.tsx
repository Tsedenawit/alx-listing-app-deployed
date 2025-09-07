// components/property/ReviewSection.tsx
import axios from "axios";
import { useState, useEffect } from "react";

type Review = {
    id: string | number;
    comment: string;
    rating?: number;
    user?: {
        name: string;
    };
};

type ReviewSectionProps = {
    propertyId: string | number;
};

const ReviewSection = ({ propertyId }: ReviewSectionProps) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setError(null);
                const response = await axios.get<Review[]>(
                    `/api/properties/${propertyId}/reviews`
                );
                setReviews(response.data);
            } catch (err: unknown) {
                setError("Failed to load reviews.");
                console.error("Error fetching reviews:", err);
            } finally {
                setLoading(false);
            }
        };

        if (propertyId) {
            fetchReviews();
        }
    }, [propertyId]);

    if (loading) {
        return <p>Loading reviews...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (reviews.length === 0) {
        return <p>No reviews yet.</p>;
    }

    return (
        <div className="space-y-4">
            {reviews.map((review) => (
                <div
                    key={review.id}
                    className="rounded border p-3 shadow-sm"
                >
                    <p className="text-gray-800">{review.comment}</p>
                    {review.rating && (
                        <p className="text-sm text-gray-600">Rating: {review.rating}/5</p>
                    )}
                    {review.user?.name && (
                        <p className="text-sm text-gray-500">– {review.user.name}</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ReviewSection;
