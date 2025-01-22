"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Products.module.scss';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
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
          // Extract rows (skipping the header row)
          const rows = data.values.slice(1); // Assumes the first row is the header
          const formattedData = rows.map((row: string[]) => ({
            id: row[0] || 'No id', // Adjust index based on your column order
            name: row[1] || 'No name',
            description: row[2] || 'No description',
            price: row[3] || 'No price',
            imageUrl: row[4] || '',
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
          {product.imageUrl && <img src={product.imageUrl} alt={product.name} className={styles.productsImage} />}
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