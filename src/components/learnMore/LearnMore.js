'use client';
import { useState, useEffect } from 'react';
import styles from './LearnMore.module.scss';

const LearnMore = ({ apiEndpoint }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiEndpoint);
                const result = await response.json();
                if (result.values) {
                    const rows = result.values.slice(1);
                    const formattedData = rows.map((row) => ({
                        title: row[0] || 'No title',
                        text: row[1] || 'No text',
                        image: row[2] || '',
                    }));
                    
                    setData(formattedData[0]);
                    console.log(result);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [apiEndpoint]);

    if (loading) return <div className='inner-section'><p>Loading...</p></div>;
    if (!data) return  <div className='inner-section'><p>No data found</p></div>;
    
    return (
        <div className={styles.learnMore}>
            <div className={styles.learnMoreContentWrap}>
                <div className={`${styles.learnMoreCol} ${styles.text}`}>
                    <h2>{data.title}</h2>
                    <p>{data.text}</p>    
                </div>
                <div className={styles.learnMoreCol}>
                    <img src={data.image} alt="Learn More" className={styles.learnMoreImage} />
                </div>
            </div>
        </div>
    );
};

export default LearnMore;