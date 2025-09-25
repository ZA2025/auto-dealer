"use client";

import React, { useState, useEffect } from "react";
import styles from './Faq.module.scss';

const Faq = () => {
    const [faqItems, setFaqItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openIndex, setOpenIndex] = useState(null);

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
                    const formattedData = rows.map((row) => ({
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

    const toggleOpen = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className={styles.faq}>
            <h1>FAQ</h1>
            {faqItems.map((item, index) => (
                <div key={index} className={styles.faqItem}>
                    <button onClick={() => toggleOpen(index)} className={`${styles.question} ${openIndex === index ? styles.open : ''}`} aria-expanded={openIndex === index}>
                        <span>{item.question}</span>
                        <span className={styles.icon} aria-hidden>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
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