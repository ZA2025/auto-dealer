"use client";
import NotFound from '@/app/not-found';
import { useParams, useRouter } from 'next/navigation'; 
import { useState, useEffect } from 'react';
import styles from './ProductDetails.module.scss';


interface ProductDetailsProps {
    apiUrl: string;
}

interface Car {
    id: string;
    name: string;
    description: string;
    price: string;
    image: string;
}

const ProductDetails = ({ apiUrl }: ProductDetailsProps) => {
    const { id } = useParams();
    const router = useRouter(); // Initialize the router
    const [car, setCar] = useState<Car | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
     
    useEffect(() => {
        if (id) {
            const fetchCarDetails = async () => {
                try {
                    const response = await fetch(apiUrl);
                    const data = await response.json();

                    if (data.values) {
                        const [header, ...rows] = data.values; // Extract header and rows
                        const headerMap: { [key: string]: number } = {};
                        
                        // Create a mapping of header keys to their indices
                        header.forEach((key: string, index: number) => {
                            headerMap[key] = index;
                        });

                        const carDetails = rows.find((row: string[]) => row[headerMap['id']] === id);

                        if (carDetails) {
                            const car = {
                                id: carDetails[headerMap['id']],
                                name: carDetails[headerMap['name']],
                                description: carDetails[headerMap['description']],
                                price: carDetails[headerMap['price']],
                                image: carDetails[headerMap['image']],
                            };
                            setCar(car);
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

    if (loading) return <div className='inner-section'><p>Loading...</p></div>;
    if (error) return <NotFound />;

     

    return (
        <div className={styles.productDetails}>
            <div className='inner-section'>
                
                <div className={styles.productDetailsWrap}>
                    {car && (
                        <>
                            <div className={styles.productDetailsCol}>
                                <img src={car.image} alt={car.name} className={styles.productDetailsImage} />
                            </div>
                            <div className={styles.productDetailsCol}>
                                <h1>Car Details</h1>
                                <p>{car.name}</p>
                                <p>{car.description}</p>
                                <p>{car.price}</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;