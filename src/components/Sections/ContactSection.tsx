"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { submitContactForm, type ContactFormData } from "@/lib/contact";

export function ContactSection() {
  const t = useTranslations("sections.contact");

  const [form, setForm] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorDetail, setErrorDetail] = useState<string>("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    const result = await submitContactForm(form);
    if (result.success) {
      setStatus("success");
    } else {
      setErrorDetail(result.error ?? "");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="p-8 lg:p-12 flex flex-col items-center justify-center min-h-48 text-center">
        <div className="w-10 h-10 rounded-full border border-accent flex items-center justify-center mb-4">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <p className="font-display text-2xl font-light text-text-primary">
          {t("successMessage")}
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 lg:p-12">
      <h2 className="font-display text-4xl lg:text-5xl font-light tracking-wide text-text-primary mb-3">
        {t("title")}
      </h2>
      <p className="text-text-muted text-sm font-sans mb-8">{t("subtitle")}</p>

      <form onSubmit={handleSubmit} noValidate className="grid lg:grid-cols-2 gap-6">
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-sans text-xs tracking-widest uppercase text-text-muted">
            {t("nameLabel")}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder={t("namePlaceholder")}
            className="bg-surface-raised border border-white/10 focus:border-accent outline-none rounded-sm px-4 py-3 font-sans text-sm text-text-primary placeholder:text-text-muted/50 transition-colors"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-sans text-xs tracking-widest uppercase text-text-muted">
            {t("emailLabel")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder={t("emailPlaceholder")}
            className="bg-surface-raised border border-white/10 focus:border-accent outline-none rounded-sm px-4 py-3 font-sans text-sm text-text-primary placeholder:text-text-muted/50 transition-colors"
          />
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2 lg:col-span-2">
          <label htmlFor="message" className="font-sans text-xs tracking-widest uppercase text-text-muted">
            {t("messageLabel")}
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={form.message}
            onChange={handleChange}
            placeholder={t("messagePlaceholder")}
            className="bg-surface-raised border border-white/10 focus:border-accent outline-none rounded-sm px-4 py-3 font-sans text-sm text-text-primary placeholder:text-text-muted/50 transition-colors resize-none"
          />
        </div>

        {/* Error message */}
        {status === "error" && (
          <div className="lg:col-span-2 font-sans">
            <p className="text-sm text-red-400">{t("errorMessage")}</p>
            {errorDetail && (
              <p className="text-xs text-red-400/70 mt-1 break-all">{errorDetail}</p>
            )}
          </div>
        )}

        {/* Submit */}
        <div className="lg:col-span-2 flex justify-end">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="bg-accent hover:bg-accent-hover disabled:opacity-50 text-bg font-sans text-sm tracking-widest uppercase px-8 py-3 transition-colors duration-150"
          >
            {status === "submitting" ? "..." : t("sendButton")}
          </button>
        </div>
      </form>
    </div>
  );
}
