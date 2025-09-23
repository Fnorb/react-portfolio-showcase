import clsx from "clsx";
import { createElement, type ElementType, type ReactNode } from "react";

type SectionProps = {
  className?: string;
  children?: ReactNode;
  as?: ElementType;
};

export default function Section({
  className,
  children,
  as: Tag = "section",
}: SectionProps) {
  return createElement(
    Tag,
    {
      className: clsx(
        "rounded-2xl bg-white dark:bg-neutral-900",
        "shadow-sm ring-1 ring-black/5 dark:ring-white/10",
        "p-6 sm:p-8",
        className
      ),
    },
    children
  );
}
