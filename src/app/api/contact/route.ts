import { Resend } from "resend";
import { NextResponse } from "next/server";

const MAX_BODY_BYTES = 10_240; // 10 KB
const EMAIL_RE = /^[^\s@\r\n]+@[^\s@\r\n]+\.[^\s@\r\n]+$/;

function stripNewlines(s: string): string {
  return s.replace(/[\r\n]/g, " ").trim();
}

function validationError(msg: string) {
  return NextResponse.json({ error: msg }, { status: 400 });
}

export async function POST(request: Request) {
  try {
    // Reject non-JSON content types
    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json({ error: "Unsupported media type." }, { status: 415 });
    }

    // Reject oversized bodies
    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Request too large." }, { status: 413 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json({ error: "Email service not configured." }, { status: 500 });
    }

    // Fail closed if recipient is not explicitly configured in production
    const recipient = process.env.CONTACT_EMAIL;
    if (!recipient) {
      if (process.env.NODE_ENV === "production") {
        console.error("CONTACT_EMAIL is not set in production");
        return NextResponse.json({ error: "Email service not configured." }, { status: 500 });
      }
    }
    const to = recipient ?? "petr@machackovi.net";

    // Parse and validate body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return validationError("Invalid JSON body.");
    }

    if (typeof body !== "object" || body === null) {
      return validationError("Invalid request body.");
    }

    const { name, email, message } = body as Record<string, unknown>;

    if (typeof name !== "string" || name.trim().length === 0) {
      return validationError("Missing or invalid field: name.");
    }
    if (name.trim().length > 200) {
      return validationError("Field 'name' is too long (max 200 characters).");
    }

    if (typeof email !== "string" || email.trim().length === 0) {
      return validationError("Missing or invalid field: email.");
    }
    if (!EMAIL_RE.test(email.trim())) {
      return validationError("Field 'email' is not a valid email address.");
    }

    if (typeof message !== "string" || message.trim().length === 0) {
      return validationError("Missing or invalid field: message.");
    }
    if (message.trim().length > 5000) {
      return validationError("Field 'message' is too long (max 5000 characters).");
    }

    // Sanitize: strip newlines from header-injectable fields
    const safeName = stripNewlines(name);
    const safeEmail = stripNewlines(email);
    const safeMessage = message.trim();

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: "Žižkovský tunel <onboarding@resend.dev>",
      to,
      replyTo: safeEmail,
      subject: `Zpráva od ${safeName} / Message from ${safeName}`,
      text: `Jméno / Name: ${safeName}\nE-mail: ${safeEmail}\n\n${safeMessage}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
