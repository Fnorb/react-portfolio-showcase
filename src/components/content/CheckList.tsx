import clsx from "clsx";
import type { ReactNode } from "react";

export default function CheckList({
  items,
  className,
}: {
  items: ReactNode[];
  className?: string;
}) {
  return (
    <ul className={clsx("mt-4 grid gap-2", className)}>
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span
            className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center
                       rounded-full bg-emerald-500/15 text-emerald-700
                       dark:bg-emerald-400/15 dark:text-emerald-300"
            aria-hidden
          >
            <svg
              viewBox="0 0 20 20"
              className="h-3.5 w-3.5"
              fill="currentColor"
            >
              <path d="M7.667 13.233 4.9 10.467l-1.4 1.4 4.167 4.166 9-9-1.4-1.4-7.6 7.6z" />
            </svg>
          </span>
          <span className="text-neutral-800 dark:text-neutral-200 leading-relaxed">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
