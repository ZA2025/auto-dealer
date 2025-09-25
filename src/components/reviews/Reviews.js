"use client";
import styles from './Reviews.module.scss';
import { useState, useEffect } from 'react';
import Slider from "react-slick";
import Link from 'next/link';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/reviews");
        const data = await response.json();

        if (response.ok) {
          setReviews(data.reviews || []);
        } else {
          console.error("Error fetching reviews:", data.error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="inner-section">
        <p>Loading reviews...</p>
      </div>
    );
  }
  // ✅ Helper function to convert rating to stars
  const renderStars = (rating) => {
    const starCount = Math.max(1, Math.min(5, parseInt(rating) || 0)); // Ensure 1-5 range
    return "★".repeat(starCount);
  };

  const settings = {
    className: "center",
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // show 1 review at a time
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 5000,
  };

  return (
    <section className={styles.reviews}>
      <div className="inner-section">
        <section className={styles.reviewsContent}>
            <h2>Reviews</h2>
            <div className={styles.reviewsList}>
                {reviews.length === 0 ? (
                <p>No reviews yet</p>
                ) : (
                <Slider {...settings}>
                    {reviews.map((review, index) => (
                        <div key={index} className={styles.reviewsCard}>
                            <div className={styles.reviewsHeader}>
                              <p className={styles.review}>{review.review}</p>
                              <p className={styles.rating}>{renderStars(review.rating)}</p>
                              <p className={styles.name}><strong>{review.name}</strong></p>
                              {review.date && <p className={styles.date}>{review.date}</p>}
                            </div>
                             
                        </div>
                    ))}
                </Slider>
                )}
            </div>
            <div className={styles.reviewsBtnContainer}>
                  <Link href={`/reviews`} className={styles.reviewsBtn}>
                    Add a review
                </Link>
            </div>
        </section>
         
      </div>
    </section>
  );
};

export default Reviews;
 