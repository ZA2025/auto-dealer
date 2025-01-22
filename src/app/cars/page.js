
import Products from "@/components/products/Products";
import LearnMore from "@/components/learnMore/LearnMore";

const CarsPage = () => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY;
    const spreadsheetId = process.env.PRODUCT_SPREADSHEET_ID;
    const range = 'Sheet1';
    const apiEndpoint = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;
    return (
        <div>
            <div className="inner-section">
                <LearnMore
                    apiEndpoint={apiEndpoint}
                />
                <h1>Cars</h1>
                <Products />
            </div> 
        </div>
    );
};

export default CarsPage;