import { useState } from "react";
import { useTranslation } from "react-i18next";
import Lightbox, { type LightboxItem } from "../components/Lightbox";
import data from "../data/placeholders.json";

type ImgItem = {
  file: string;
  lqip?: string;
  thumb?: string;
  full?: string;
};

export default function LQIPPage() {
  const { t } = useTranslation("gallery");
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<LightboxItem | undefined>(undefined);

  const items: LightboxItem[] = (data as ImgItem[]).map((img) => ({
    thumbSrc: img.thumb ?? img.file,
    fullSrc: img.full ?? img.file,
    lqip: img.lqip,
    alt: t("imageAlt"),
  }));

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-300">
        {t("subtitle")}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((it, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setCurrent(it);
              setOpen(true);
            }}
            className="relative overflow-hidden rounded-lg shadow aspect-[4/3] group
             cursor-zoom-in focus:outline-none focus-visible:ring-2
             focus-visible:ring-emerald-500"
          >
            {it.lqip && (
              <img
                src={it.lqip}
                alt=""
                aria-hidden
                className="absolute inset-0 h-full w-full object-cover blur-md scale-105"
              />
            )}

            <img
              src={it.thumbSrc}
              alt={it.alt}
              loading="lazy"
              onLoad={(e) => (e.currentTarget.style.opacity = "1")}
              className="absolute inset-0 h-full w-full object-cover
               opacity-0 transition-opacity duration-700
               group-hover:scale-[1.02]"
            />

            <div
              className="pointer-events-none absolute inset-0 rounded-lg
               bg-black/0 transition-colors duration-200
               group-hover:bg-black/30 dark:group-hover:bg-white/20"
            />
          </button>
        ))}
      </div>

      <Lightbox open={open} onClose={() => setOpen(false)} item={current} />
    </section>
  );
}
