import { useTranslations } from "next-intl";

interface ContactRowProps {
  label: string;
  value: React.ReactNode;
}

function ContactRow({ label, value }: ContactRowProps) {
  return (
    <div className="border-l-2 border-accent/35 pl-4 space-y-0.5">
      <p className="font-sans text-[0.6rem] tracking-[0.4em] uppercase text-accent">
        {label}
      </p>
      <div className="font-sans text-sm text-text-primary/85 leading-relaxed whitespace-pre-line">
        {value}
      </div>
    </div>
  );
}

export function FindUsSection() {
  const t = useTranslations("sections.findUs");

  return (
    <div className="p-8 lg:p-10">
      <p className="font-sans text-[0.6rem] tracking-[0.4em] uppercase text-accent mb-1">
        {t("title")}
      </p>
      <h2 className="font-sans text-3xl lg:text-4xl font-light tracking-wide text-text-primary mb-8">
        {t("orgName")}
      </h2>

      <div className="grid grid-cols-3 gap-6 lg:gap-10">
        <ContactRow label={t("icoLabel")} value={t("ico")} />

        <ContactRow label={t("addressLabel")} value={t("address")} />

        <ContactRow
          label={t("emailLabel")}
          value={
            <a
              href={`mailto:${t("email")}`}
              className="hover:text-accent transition-colors duration-150"
            >
              {t("email")}
            </a>
          }
        />
      </div>
    </div>
  );
}
