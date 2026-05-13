import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // Recipient is configurable via env — will move to Supabase admin config later
    const recipient = process.env.CONTACT_EMAIL ?? "petr@machackovi.net";

    const { error } = await resend.emails.send({
      from: "Žižkovský tunel <onboarding@resend.dev>",
      to: recipient,
      replyTo: email,
      subject: `Zpráva od ${name} / Message from ${name}`,
      text: `Jméno / Name: ${name}\nE-mail: ${email}\n\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
