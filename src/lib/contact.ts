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
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return { success: false, error: body.error ?? "Request failed." };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Network error." };
  }
}
