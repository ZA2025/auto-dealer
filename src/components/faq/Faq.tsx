"use client";

import React, { useState, useEffect } from "react";
import styles from './Faq.module.scss';

interface FaqItem {
    question: string;
    answer: string;
}

const Faq = () => {
    const [faqItems, setFaqItems] = useState<FaqItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    useEffect(() => {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY;
        const spreadsheetId = process.env.NEXT_PUBLIC_FAQ_SPREADSHEET_ID;
        const range = 'Sheet1'; // Fetch all data from Sheet1

        const fetchData = async () => {
            try {
                const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`);
                const data = await response.json();

                if (data.values) {
                    // Assuming the first row is the header
                    const rows = data.values.slice(1);
                    const formattedData = rows.map((row: string[]) => ({
                        question: row[0] || 'No question',
                        answer: row[1] || 'No answer',
                    }));

                    setFaqItems(formattedData);
                } else {
                    console.error('No data found in the sheet');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const toggleOpen = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className={styles.faq}>
            <h1>FAQ</h1>
            {faqItems.map((item, index) => (
                <div key={index} className={styles.faqItem}>
                    <button onClick={() => toggleOpen(index)} className={styles.question}>
                        {item.question}
                    </button>
                    <div className={`${styles.answer} ${openIndex === index ? styles.answerOpen : ''}`}>
                        <p>{item.answer}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Faq;