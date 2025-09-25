"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from 'next/navigation'; 
import styles from './CustomPaging.module.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CustomPaging = ({ apiUrl }) => {
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
        autoplay: true, 
        dots: true,
        infinite: sliderImages.length > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className={styles.customPaging}>
            <div className={styles.customPagingContainer}>
                <section className={styles.customPagingLeft}>
                {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : (
                        <Slider {...settings}>
                            {sliderImages.map((image, index) => (
                                <div key={index}>
                                    <img src={image} alt={`Slide ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
                                </div>
                            ))}
                        </Slider>
                    )}
                </section>
                <section className={styles.customPagingRight}>
                    {sliderData && (
                        <div>
                            <h2>{sliderData.name}</h2>
                            <p>{sliderData.description}</p>
                            <p>{sliderData.price}</p>
                        </div>
                    )}
                </section>
            </div>
            <div className={styles.additional}>
                
            </div>
             
            
        </div>
    );
};

export default CustomPaging;