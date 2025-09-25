import { google } from "googleapis";
import path from "path";

const KEYFILEPATH = path.join(process.cwd(), "service-account.json");
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const SPREADSHEET_ID = "17cTiKY5jtEVppHR4u4cA_eexdp-78J1QRnEGzOtuTCs"; // Your Sheet ID only
const RANGE = "reviews!A:E"; // Must match your sheet

async function authSheets() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
  });
  const authClient = await auth.getClient();
  return google.sheets({ version: "v4", auth: authClient });
}

// ✅ GET reviews
export async function GET() {
    try {
      const sheets = await authSheets();
  
      // ✅ First, check which sheets are available
      const meta = await sheets.spreadsheets.get({
        spreadsheetId: SPREADSHEET_ID,
      });
  
      const sheetNames = meta.data.sheets.map((s) => s.properties.title);
      console.log("Available sheets:", sheetNames);
  
      // ✅ Now fetch the data
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: RANGE, // e.g., "Sheet1!A:E" or "reviews!A:E"
      });
  
      console.log("Raw rows:", response.data.values);
  
      const rows = response.data.values || [];
      const reviews = rows.slice(1).map(([name, email, rating, review, date]) => ({
        name,
        email,
        rating: parseInt(rating),
        review,
        date,
      }));
  
      return Response.json({ reviews });
    } catch (error) {
      console.error("GET error:", error);
      return Response.json({ error: "Failed to fetch reviews" }, { status: 500 });
    }
  }
  

// ✅ POST review
export async function POST(req) {
    try {
      const { name, email, rating, review } = await req.json();
  
      if (!name || !email || !rating || !review) {
        return Response.json({ error: "Missing fields" }, { status: 400 });
      }
  
      const sheets = await authSheets();
  
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: RANGE,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [[name, email, rating, review, new Date().toLocaleString()]],
        },
      });
  
      return Response.json({ message: "Review added" }, { status: 201 });
    } catch (error) {
      console.error("❌ POST error is:", error?.errors || error);
      return Response.json(
        { error: error?.message || "Failed to add review" },
        { status: 500 }
      );
    }
  }
