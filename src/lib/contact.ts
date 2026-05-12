/**
 * Contact form submission handler.
 *
 * Phase 1 (current): opens a mailto: link in the user's email client.
 * Phase 2: replace the implementation with a Supabase Edge Function or
 *           Resend API call — the ContactSection component does not need to change.
 */

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export type ContactResult = { success: true } | { success: false; error: string };

export async function submitContactForm(
  data: ContactFormData
): Promise<ContactResult> {
  try {
    const recipient = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "info@zizkovtunnel.cz";
    const subject = encodeURIComponent(`Zpráva od ${data.name} / Message from ${data.name}`);
    const body = encodeURIComponent(
      `Jméno / Name: ${data.name}\nE-mail: ${data.email}\n\n${data.message}`
    );
    const mailtoHref = `mailto:${recipient}?subject=${subject}&body=${body}`;

    if (typeof window !== "undefined") {
      window.location.href = mailtoHref;
    }

    return { success: true };
  } catch {
    return { success: false, error: "Failed to open mail client." };
  }
}

/*
 * --- Phase 2: Supabase Edge Function implementation ---
 *
 * export async function submitContactForm(
 *   data: ContactFormData
 * ): Promise<ContactResult> {
 *   const res = await fetch("/api/contact", {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify(data),
 *   });
 *   if (!res.ok) return { success: false, error: await res.text() };
 *   return { success: true };
 * }
 */
