import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export type LightboxItem = {
  thumbSrc: string;
  fullSrc: string;
  alt?: string;
  lqip?: string;
  srcSet?: string;
  sizes?: string;
};

export default function Lightbox({
  open,
  onClose,
  item,
}: {
  open: boolean;
  onClose: () => void;
  item?: LightboxItem;
}) {
  const [medLoaded, setMedLoaded] = useState(false);
  const [fullLoaded, setFullLoaded] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const prevActive = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      setMedLoaded(false);
      setFullLoaded(false);
      prevActive.current = document.activeElement as HTMLElement;
      document.body.classList.add("overflow-hidden");
      setTimeout(() => closeBtnRef.current?.focus(), 0);
    } else {
      document.body.classList.remove("overflow-hidden");
      prevActive.current?.focus?.();
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [open, item]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const prefersReduced = useReducedMotion();

  const fitImg =
    "absolute inset-0 m-auto max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-lg cursor-default";

  return createPortal(
    <AnimatePresence>
      {open && item && (
        <motion.div
          key="overlay"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4
                   bg-black/70 backdrop-blur-sm cursor-zoom-out"
          aria-modal="true"
          role="dialog"
          onClick={onClose}
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReduced ? { opacity: 0 } : { opacity: 0 }}
          transition={
            prefersReduced
              ? { duration: 0 }
              : { duration: 0.18, ease: "easeOut" }
          }
        >
          {/* Content: stoppt Klicks, damit Bild NICHT schließt */}
          <motion.div
            className="relative outline-none"
            onClick={(e) => e.stopPropagation()}
            initial={prefersReduced ? false : { y: 8, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={
              prefersReduced
                ? { opacity: 0 }
                : { y: 8, scale: 0.98, opacity: 0 }
            }
            transition={
              prefersReduced
                ? { duration: 0 }
                : { duration: 0.2, ease: "easeOut" }
            }
          >
            {/* Close */}
            <button
              ref={closeBtnRef}
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="absolute top-2 right-2 z-10 rounded-full border
                       bg-white/80 dark:bg-neutral-900/80
                       text-neutral-800 dark:text-neutral-200
                       hover:bg-white dark:hover:bg-neutral-800
                       px-2.5 py-1.5 text-sm shadow cursor-pointer"
              aria-label="Close"
            >
              ×
            </button>

            {/* Bühne: Viewport minus Padding */}
            <div className="relative w-[calc(100vw-2rem)] h-[calc(100vh-2rem)] overflow-hidden">
              {/* Medium unten */}
              <img
                src={item.thumbSrc}
                alt={item.alt ?? ""}
                loading="eager"
                onLoad={() => setMedLoaded(true)}
                onClick={(e) => e.stopPropagation()}
                className={clsx(
                  fitImg,
                  fullLoaded
                    ? "opacity-0 pointer-events-none"
                    : "opacity-100 pointer-events-auto"
                )}
                style={{ transition: "opacity 300ms ease" }}
              />
              {/* HQ oben */}
              <img
                src={item.fullSrc}
                alt={item.alt ?? ""}
                srcSet={item.srcSet}
                sizes={item.sizes}
                loading={medLoaded ? "eager" : "lazy"}
                onLoad={() => setFullLoaded(true)}
                onClick={(e) => e.stopPropagation()}
                className={clsx(
                  fitImg,
                  fullLoaded
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                )}
                style={{ transition: "opacity 300ms ease" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
