"use client";
import ProductDetails from '@/components/productDetails/ProductDetails';
import Carousel from '@/components/carousel/Carousel';
import ImageCarousel from '@/components/imageCarousel/ImageCarousel';

const SlidesDetailsPage = () => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY;
    const spreadsheetId = process.env.NEXT_PUBLIC_SLIDER_SPREADSHEET_ID;
    const range = 'Sheet1'; // Fetch all data from Sheet1

    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

    return (
        <>
            <ImageCarousel apiUrl={apiUrl} />
        </>
    );
};

export default SlidesDetailsPage;