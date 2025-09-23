import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const [lng, setLng] = useState(() => (i18n.language || "de").slice(0, 2));

  useEffect(() => {
    const handler = (l: string) => setLng((l || "de").slice(0, 2));
    i18n.on("languageChanged", handler);
    return () => i18n.off("languageChanged", handler);
  }, [i18n]);

  const isDE = lng === "de";
  const next = isDE ? "en" : "de";

  const onToggle = () => i18n.changeLanguage(next);

  return (
    <button
      type="button"
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      aria-label={
        isDE ? "Switch language to English" : "Sprache zu Deutsch wechseln"
      }
      title={isDE ? "Switch to English" : "Auf Deutsch umschalten"}
      className="rounded-md border px-2.5 py-1.5 text-sm cursor-pointer
                 hover:bg-black/5 dark:hover:bg-white/10
                 flex items-center gap-1.5"
    >
      <span
        className={
          isDE
            ? "uppercase font-semibold px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/15 text-neutral-900 dark:text-white"
            : "lowercase text-neutral-600 dark:text-neutral-400"
        }
      >
        de
      </span>
      <span className="opacity-50">/</span>
      <span
        className={
          !isDE
            ? "uppercase font-semibold px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/15 text-neutral-900 dark:text-white"
            : "lowercase text-neutral-600 dark:text-neutral-400"
        }
      >
        en
      </span>
    </button>
  );
}
