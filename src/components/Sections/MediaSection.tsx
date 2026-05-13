import { useTranslations } from "next-intl";

interface Article {
  title: string;
  source: string;
  date: string;
  url: string;
}

function ExternalLinkIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export function MediaSection() {
  const t = useTranslations("sections.media");
  const articles = t.raw("articles") as Article[];

  return (
    <div className="p-8 lg:p-12">
      <h2 className="font-display text-4xl lg:text-5xl font-light tracking-wide text-text-primary mb-3">
        {t("title")}
      </h2>
      <p className="text-text-muted text-sm font-sans mb-10">
        {t("subtitle")}
      </p>

      <ul className="space-y-0 divide-y divide-white/5">
        {articles.map((article, i) => (
          <li key={i}>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start justify-between gap-6 py-5 group"
            >
              <div className="min-w-0">
                <p className="font-sans text-sm text-text-primary group-hover:text-accent transition-colors duration-150 leading-snug">
                  {article.title}
                </p>
                <p className="font-sans text-xs text-text-muted mt-1">
                  {article.source}
                  {article.date && (
                    <span className="ml-3 text-text-muted/50">{article.date}</span>
                  )}
                </p>
              </div>
              <span className="text-text-muted group-hover:text-accent transition-colors duration-150 mt-0.5">
                <ExternalLinkIcon />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
