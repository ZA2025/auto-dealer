"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from 'next/navigation'; 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './ImageCarousel.module.scss';

const ImageCarousel = ({ apiUrl }) => {
    const { id } = useParams();
    const router = useRouter();
    const [sliderImages, setSliderImages] = useState([]);
    const [sliderData, setSliderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            const fetchSliderData = async () => {
                try {
                    const response = await fetch(apiUrl);
                    const data = await response.json();

                    if (data.values) {
                        const [headers, ...rows] = data.values;

                        const headerMap = headers.reduce((acc, key, index) => {
                            acc[key] = index;
                            return acc;
                        }, {});

                        const formattedData = rows.map((row) => ({
                            id: row[headerMap['id']] || 'No id',
                            name: row[headerMap['name']] || 'No name',
                            description: row[headerMap['description']] || 'No description',
                            price: row[headerMap['price']] || 'No price',
                            images: row[headerMap['image']] ? row[headerMap['image']].split(',') : [],
                        }));

                        const productDetails = formattedData.find((slide) => slide.id === id);
                        if (productDetails) {
                            setSliderImages(productDetails.images);
                            setSliderData(productDetails);
                        } else {
                            router.push('/404');
                        }
                    } else {
                        setError('No data found in the sheet');
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setError('Error fetching data');
                } finally {
                    setLoading(false);
                }
            };
            fetchSliderData();
        }
    }, [id, apiUrl]);

    const settings = {
        customPaging: function(i) {
            return (
                <a>
                    <img src={sliderImages[i]} alt={`Thumbnail ${i + 1}`} style={{ width: '50px', height: '50px' }} />
                </a>
            );
        },
        dots: true,
        infinite: sliderImages.length > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className={styles.imageCarousel}>
            <div className="inner-section">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? ( // Display error message if there is an error
                    <p>Error: {error}</p>
                ) : (
                    <div className={styles.imageCarouselWrapper}>
                        <div className={`${styles.imageCarouselCol} ${styles.left}`}>
                            <Slider {...settings}>
                                {sliderImages.map((image, index) => (
                                    <div key={index} style={{ padding: '10px' }}>
                                        <img src={image} alt={`Slide ${index + 1}`} style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                        {sliderData && (
                            <div className={`${styles.imageCarouselCol} ${styles.right}`}>
                                <h2>{sliderData.name}</h2>
                                <p>{sliderData.description}</p>
                                <p>{sliderData.price}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageCarousel;