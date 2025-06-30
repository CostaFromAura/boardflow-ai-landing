import { NextResponse } from "next/server";
import { Resend } from "resend";
import fs from "fs";
import path from "path";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  console.log("🚀 API route called");

  try {
    const body = await req.json();
    console.log("📧 Request body:", body);

    const { email } = body;

    // Check if API key exists
    console.log("🔑 API Key exists:", !!process.env.RESEND_API_KEY);
    console.log("🔑 API Key preview:", process.env.RESEND_API_KEY?.substring(0, 10) + "...");

    if (!email) {
      console.log("❌ No email provided");
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

    console.log("📤 Attempting to send email to:", email);

    const data = await resend.emails.send({
      from: "BoardFlow.ai <hello@timeaura.com.br>",
      to: [email],
      subject: "Thanks for joining BoardFlow.ai!",
      html: htmlContent,
    });

    if (data.error) {
      console.log("🚨 Resend returned an error:", data.error);
      throw new Error(data.error.message || "Email sending failed");
    }

    console.log("✅ Email sent successfully:", data);

    return NextResponse.json({
      success: true,
      data: data.data,
      message: "Email sent successfully",
    });

  } catch (error) {
    console.error("❌ Detailed error:", error);

    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
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
