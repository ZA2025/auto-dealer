"use client";

import styles from './Subscribe.module.scss';
import React, { useState } from "react";

const Subscribe = () => {
    // State for form fields
    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });

    // State for errors
    const [errors, setErrors] = useState({
        name: "",
        email: "",
    });

    // State for success message
    const [successMessage, setSuccessMessage] = useState("");

    // Validation function
    const validateField = (name, value) => {
        let error = "";
        if (name === "name" && !value.trim()) {
            error = "Name is required.";
        }
        if (name === "email") {
            if (!value.trim()) {
                error = "Email is required.";
            } else if (!/\S+@\S+\.\S+/.test(value)) {
                error = "Email is not valid.";
            }
        }
        return error;
    };

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update field value
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Validate the field and update errors
        setErrors((prev) => ({
            ...prev,
            [name]: validateField(name, value),
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields
        const newErrors = {
            name: validateField("name", formData.name),
            email: validateField("email", formData.email),
        };

        setErrors(newErrors);

        // Check if there are no errors
        const isValid = !Object.values(newErrors).some((error) => error);
        if (isValid) {
            try {
                // Create a FormData object to send as form-encoded
                const formDataToSend = new URLSearchParams();
                formDataToSend.append('Name', formData.name);
                formDataToSend.append('Email', formData.email);

                const googleScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
                if (!googleScriptUrl) {
                    console.error("Google Script URL is not defined.");
                    return;
                }

                const response = await fetch(googleScriptUrl, {
                    method: 'POST',
                    body: formDataToSend, // Send as form data (URL-encoded)
                });

                if (response.ok) {
                    setSuccessMessage("Thank you for subscribing!");
                    // Clear form fields
                    setFormData({
                        name: "",
                        email: "",
                    });
                    // Clear success message after 3 seconds
                    setTimeout(() => {
                        setSuccessMessage("");
                    }, 3000);
                } else {
                    console.error("Error submitting form: ", response.statusText);
                }
            } catch (error) {
                console.error("Error submitting form: ", error);
            }
        }
    };

    return (
        <div className={styles.subscribe}>
            <div className={styles.subscribeContent}>
                <div className={styles.subscribeWrap}>
                <h1>Subscribe to our newsletter</h1>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
                {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formRow}>
                        <input
                            className={styles.formInput}
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Name"
                            aria-label="Name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <span className={styles.error}>{errors.name}</span>}
                    </div>
                    <div className={styles.formRow}>
                        <input
                            className={styles.formInput}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            aria-label="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <span className={styles.error}>{errors.email}</span>}
                    </div>
                    <div className={styles.formRow}>
                    <button
                        type="submit"
                        className={styles.formSubmit}
                        >
                        Submit
                    </button>

                    </div>
                </form>
                </div>
                 
            </div>
        </div>
    );
};

export default Subscribe;