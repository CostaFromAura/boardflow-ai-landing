import { NextResponse } from "next/server";
import { Resend } from "resend";
import fs from "fs";
import path from "path";
import { google } from "googleapis";
import { JWT } from "google-auth-library";

const resend = new Resend(process.env.RESEND_API_KEY);
const DATA_FILE = path.resolve(process.cwd(), "data", "submissions.json");

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const SHEET_ID = process.env.GOOGLE_SHEET_ID!;
const SHEET_NAME = "Submissions";

const auth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  scopes: SCOPES,
});

export async function POST(req: Request) {
  console.log("🚀 API route called");

  try {
    const body = await req.json();
    console.log("📧 Request body:", body);

    const { name, email, referral, role } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // 🔄 Lê o HTML do template
    const templatePath = path.resolve(process.cwd(), "templates", "thank-you-email.html");
    let htmlContent = "";

    try {
      htmlContent = fs.readFileSync(templatePath, "utf8");
    } catch (readErr) {
      console.error("❌ Failed to read email template:", readErr);
      return NextResponse.json({ error: "Failed to load email template." }, { status: 500 });
    }

    // ✉️ Envia o e-mail
    const data = await resend.emails.send({
      from: "BoardFlow.ai <hello@timeaura.com.br>",
      to: [email],
      subject: "Thanks for joining BoardFlow.ai!",
      html: htmlContent,
    });

    if (data.error) {
      throw new Error(data.error.message || "Email sending failed");
    }

    console.log("✅ Email sent successfully to:", email);

    const submission = {
      name,
      email,
      referral,
      role,
      date: new Date().toISOString(),
    };

    // ✅ Salva no Google Sheets
    const sheets = google.sheets({ version: "v4", auth });
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A:E`,
      valueInputOption: "RAW",
      requestBody: {
        values: [[submission.date, submission.name, submission.email, submission.referral, submission.role]],
      },
    });

    // 📝 Também salva localmente (backup)
    const dataDir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    let currentData: any[] = [];
    if (fs.existsSync(DATA_FILE)) {
      const fileContents = fs.readFileSync(DATA_FILE, "utf8");
      try {
        currentData = JSON.parse(fileContents);
      } catch {
        currentData = [];
      }
    }

    currentData.push(submission);
    fs.writeFileSync(DATA_FILE, JSON.stringify(currentData, null, 2));

    return NextResponse.json({
      success: true,
      message: "Email sent and data stored (local + sheets).",
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const errorDetails = error instanceof Error ? error.stack : String(error);

    return NextResponse.json(
      {
        error: errorMessage,
        details: errorDetails,
      },
      { status: 500 }
    );
  }
}
