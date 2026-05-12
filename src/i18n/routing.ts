import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["cs", "en", "de", "pl", "sk"],
  defaultLocale: "cs",
  localePrefix: "always",
});
