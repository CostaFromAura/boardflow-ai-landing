import { google } from "googleapis";

export async function appendToSheet(data: {
  name: string;
  email: string;
  referral: string;
  role: string;
}) {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON || ""),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const spreadsheetId = process.env.GOOGLE_SHEET_ID!;
  const range = "A:E"; // Supondo que as colunas sejam A a E

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          data.name,
          data.email,
          data.referral,
          data.role,
          new Date().toISOString(),
        ],
      ],
    },
  });
}
