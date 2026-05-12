import { useTranslations } from "next-intl";

export function AboutSection() {
  const t = useTranslations("sections.about");

  const members = [
    { name: "Martin Wichterle", role: t("members.list.0.role") },
    { name: "Jiří Řezák", role: t("members.list.1.role") },
    { name: "David Koller", role: t("members.list.2.role") },
    { name: "Jiří Fajt", role: t("members.list.3.role") },
  ];

  return (
    <div className="p-8 lg:p-12">
      <h2 className="font-display text-4xl lg:text-5xl font-light tracking-wide text-text-primary mb-8">
        {t("title")}
      </h2>

      <div className="grid lg:grid-cols-2 gap-10">
        <div>
          {t("body")
            .split("\n\n")
            .map((paragraph, i) => (
              <p key={i} className="text-text-primary/85 leading-relaxed mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
        </div>

        <div>
          <h3 className="font-display text-xl font-light tracking-widest uppercase text-accent mb-6">
            {t("members.title")}
          </h3>
          <ul className="space-y-5">
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
      </div>
    </div>
  );
}
