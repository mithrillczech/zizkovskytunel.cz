import { useTranslations } from "next-intl";

export function FoundersSection() {
  const t = useTranslations("sections.founders");

  const members = [
    { name: "Martin Wichterle", role: t("list.0.role") },
    { name: "Jiří Řezák",       role: t("list.1.role") },
    { name: "David Koller",     role: t("list.2.role") },
    { name: "Jiří Fajt",        role: t("list.3.role") },
  ];

  return (
    <div className="p-8 lg:p-12">
      <h2 className="font-display text-4xl lg:text-5xl font-light tracking-wide text-text-primary mb-8">
        {t("title")}
      </h2>

      <ul className="space-y-5 max-w-xl">
        {members.map((member) => (
          <li key={member.name} className="border-l border-accent/30 pl-4">
            <p className="font-sans font-medium text-text-primary text-sm">
              {member.name}
            </p>
            <p className="font-sans text-text-muted text-sm mt-0.5">
              {member.role}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
