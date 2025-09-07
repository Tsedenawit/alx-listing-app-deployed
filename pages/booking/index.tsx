// pages/booking/index.tsx
import axios from "axios";
import { useState, ChangeEvent, FormEvent } from "react";

export default function BookingForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        cardNumber: "",
        expirationDate: "",
        cvv: "",
        billingAddress: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            await axios.post("/api/bookings", formData);
            setMessage("Booking confirmed!");
        } catch (err) {
            setMessage(err + " " + "Failed to submit booking.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Example input */}
            <input
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
            />

            {/* Add other fields the same way */}
            <button type="submit" disabled={loading}>
                {loading ? "Processing..." : "Confirm & Pay"}
            </button>

            {message && <p>{message}</p>}
        </form>
    );
}
