import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GalleryLock = () => {

    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleUnlock = async (e) => {

        e.preventDefault();

        if (!password) {
            setError("Please enter the password");
            return;
        }

        try {

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/gallery/unlock`,
                {
                    password: password
                }
            );

            // Store gallery access token
            sessionStorage.setItem(
                "galleryToken",
                response.data.token
            );

            // Open gallery
            navigate("/posts");

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Incorrect password"
            );
        }
    };

    return (
        <section className="create-post-section">

            <form onSubmit={handleUnlock}>

                <h1>🔒 Private Gallery</h1>

                <h2>Gallery Locked</h2>

                <p>
                    Enter the password to access the gallery.
                </p>

                <input
                    type="password"
                    placeholder="Enter gallery password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                    }}
                />

                {error && (
                    <p className="gallery-error">
                        {error}
                    </p>
                )}

                <button type="submit">
                    Unlock Gallery 🔓
                </button>

            </form>

            <button
                type="button"
                className="back-button"
                onClick={() => navigate("/create-post")}
            >
                Back
            </button>

        </section>
    );
};

export default GalleryLock;