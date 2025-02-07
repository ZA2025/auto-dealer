"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Products.module.scss';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY;
      const spreadsheetId = process.env.NEXT_PUBLIC_SPREADSHEET_ID;
      const range = 'Sheet1'; // Fetch all data from Sheet1

      const sheetURL = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

      try {
        const response = await fetch(sheetURL);
        const data = await response.json();

        if (data.values) {
          const [headers, ...rows] = data.values; // Destructure headers and rows
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

          setProducts(formattedData);
        } else {
          console.error('No data found in the sheet');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className='inner-section'><p>Loading...</p></div>;

  return (
    <div className={styles.products}>
      {products.map((product) => (
        <div key={product.id} className={styles.productsCard}>
          {product.images.length > 0 && (
            <img src={product.images[0]} alt={product.name} className={styles.productsImage} /> // Display only the first image
          )}
          <div className={styles.productsInfo}>
            <h2 className={styles.productsTitle}>{product.name}</h2>
            <p className={styles.productsText}>{product.description}</p>
            <p><span className={styles.productsPrice}>{product.price}</span></p>
            <Link href={`/cars/${product.id}`} className={styles.cardLink}>
              Find out more
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;