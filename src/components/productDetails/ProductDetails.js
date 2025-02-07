"use client";
import { useParams, useRouter } from 'next/navigation'; 
import { useState, useEffect } from 'react';
import styles from './ProductDetails.module.scss';

const ProductDetails = ({ apiUrl }) => {
    const { id } = useParams();
    const router = useRouter(); // Initialize the router
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (id) {
            const fetchCarDetails = async () => {
                try {
                    const response = await fetch(apiUrl);
                    const data = await response.json();
                    console.log(data);
                    if (data.values) {
                        const [headers, ...rows] = data.values; // Extract headers and rows
                        const headerMap = headers.reduce((acc, key, index) => {
                            acc[key] = index;
                            return acc;
                        }, {});

                        const formattedData = rows.map((row) => ({
                            id: row[headerMap['id']] || 'No id',
                            name: row[headerMap['name']] || 'No name',
                            description: row[headerMap['description']] || 'No description',
                            price: row[headerMap['price']] || 'No price',
                            images: row[headerMap['image']] ? row[headerMap['image']].split(',') : [], // Split the image URLs by comma
                        }));

                        const carDetails = formattedData.find((car) => car.id === id);

                        if (carDetails) {
                            setCar(carDetails);
                        } else {
                            setError(true);
                            //console.error('No car found with the specified id');
                        }
                    } else {
                        console.error('No data found in the sheet');
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchCarDetails();
        }
    }, [id, apiUrl]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>No car details found</p>;

    return (
        <div className={styles.productDetails}>
            <div className='inner-section'>
                <div className={styles.productDetailsWrap}>
                    <div className={styles.productDetailsCol}>
                        {car?.images.map((image, index) => (
                            <img key={index} src={image} alt={car.name} className={styles.productDetailsImage} /> // Directly render the images
                        ))}
                    </div>
                    <div className={styles.productDetailsCol}>
                        <h1>Car Details</h1>
                        <p>{car?.name}</p>
                        <p>{car?.description}</p>
                        <p>{car?.price}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;