"use client";
import { useState } from "react";
import styles from './ReviewsForm.module.scss';

export default function ReviewForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    rating: "",
    review: "",
  });
  const [status, setStatus] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/reviews", {
        
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        
        setStatus(<span className="success-message">Review submitted successfully!</span>);
        setForm({ name: "", email: "", rating: "", review: "" });
      } else {
        const data = await res.json();
        const message = `Failed: ${data.error || "Something went wrong."}`;
        setStatus(<span className="error-message">{message}</span>);
      }
    } catch (error) {
      console.error("Submit error:", error);
      setStatus(<span className="error-message"> Error submitting review.</span>);
    }
  }

  return (
    <div className={styles.reviewsFormContainer}>
      <section className="inner-section">
        <h1 className={styles.reviewsTitle}>Leave a Review</h1>
        <p>Looking to leave a review?</p>
        <form
          onSubmit={handleSubmit}
          className={styles.reviewsForm}
        >
          
          <div className={styles.formGrid}>
            <div className={styles.column}>
              <div className={styles.formGroup}>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  
                />
              </div>
              <div className={styles.formGroup}>
                <select
                  name="rating"
                  value={form.rating}
                  onChange={handleChange}
                  required
                  
                >
                  <option value="">Rate Us</option>
                  <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                  <option value="4">⭐⭐⭐⭐ Very Good</option>
                  <option value="3">⭐⭐⭐ Good</option>
                  <option value="2">⭐⭐ Fair</option>
                  <option value="1">⭐ Poor</option>
                </select>
              </div>
              
            </div>
            <div className={styles.column}>
              <div className={styles.formGroup}>
                  <textarea
                    name="review"
                    value={form.review}
                    onChange={handleChange}
                    placeholder="Your Review"
                    required
                    rows={4}
                    className={styles.formGroupTextarea}
                  />
                </div>
            </div>
          </div>
          
          <div className={styles.row}>
            <button
              type="submit"
              className={styles.reviewsFormButton}
            >
              Submit
            </button>
          </div>

          {status && <p className="mt-3">{status}</p>}
        </form>
      </section>

       
    </div>
  );
}
