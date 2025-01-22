"use client";

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import styles from './Carousel.module.scss';
import Link from 'next/link';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
    interface Slide {
        id: string;
        title: string;
        description: string;
        price: string;
        image: string;
    }

    const [sliderData, setSliderData] = useState<Slide[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY;
        const spreadsheetId = process.env.NEXT_PUBLIC_SLIDER_SPREADSHEET_ID;
        const range = 'Sheet1'; // Fetch all data from Sheet1

        const fetchData = async () => {
            try {
                const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`);
                const data = await response.json();
                if (data.values) {
                    const [headers, ...rows] = data.values; // Destructure headers and rows
                    const headerMap = headers.reduce((acc: { [key: string]: number }, key: string, index: number) => {
                        acc[key] = index;
                        return acc;
                    }, {});

                    const formattedData = rows.map((row: string[]) => ({
                        id: row[headerMap['id']] || 'No id',
                        title: row[headerMap['title']] || 'No title',
                        description: row[headerMap['description']] || 'No description',
                        price: row[headerMap['price']] || 'No price',
                        image: row[headerMap['image']] || '',
                    }));

                    setSliderData(formattedData);
                } else {
                    console.error('No data found in the sheet');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        autoplay: true,
        speed: 500,
        dots: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    centerPadding: "40px",
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    centerPadding: "20px",
                }
            }
        ]
    };

    return (
        <div className={styles.slider}>
            <div className={styles.sliderWrap}>
                <h2 className={styles.sliderTitle}>Continue Exploring</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <Slider {...settings}>
                        {sliderData.map((slide) => (
                            <div key={slide.id} className={styles.slide}>
                                <img className={styles.slideImg} src={slide.image} alt={slide.title} />
                                <div className={styles.slideInfoWrap}>
                                    <h3 className={styles.slideTitle}>{slide.title}</h3>
                                    <p className={styles.slideText}>{slide.description}</p>
                                    <p>{slide.price}</p>
                                    {/*<a href="#" className={styles.slideLink}>Learn More</a>*/}
                                    <Link href={`/slides/${slide.id}`} className={styles.slideLink}>
                                        Find out more
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </Slider>
                )}
            </div>
        </div>
    );
};

export default Carousel;