import data from "../data/placeholders.json";
import { useTranslation } from "react-i18next";

export default function Gallery() {
  const { t } = useTranslation("gallery");

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        {t("subtitle")}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {data.map((img) => (
          <div
            key={img.file}
            className="relative overflow-hidden rounded-lg shadow aspect-[4/3]"
          >
            <img
              src={img.lqip}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover blur-md scale-105"
            />
            <img
              src={img.file}
              alt={t("imageAlt")}
              loading="lazy"
              onLoad={(e) => (e.currentTarget.style.opacity = "1")}
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
