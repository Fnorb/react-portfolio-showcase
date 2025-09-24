import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

const linkCls = ({ isActive }: { isActive: boolean }) =>
  clsx(
    "px-3 py-2 rounded-md text-sm font-medium transition",
    "text-neutral-700 hover:text-neutral-900 hover:bg-black/5",
    "dark:text-neutral-300 dark:hover:text-white dark:hover:bg-white/5",
    isActive &&
      "text-neutral-900 dark:text-white underline decoration-2 underline-offset-4 decoration-black/15 dark:decoration-white/20 hover:bg-transparent"
  );

export default function Nav() {
  const { t } = useTranslation("common");

  return (
    <header
      className="sticky top-0 z-40 border-b border-black/5 dark:border-white/10
                 bg-white/70 dark:bg-neutral-950/60 backdrop-blur"
      aria-label="Primary"
    >
      <nav className="mx-auto w-full max-w-screen-lg px-4">
        <div className="h-14 flex items-center gap-4">
          <NavLink to="/about" className={linkCls}>
            {t("nav.about")}
          </NavLink>
          <NavLink to="/" end className={linkCls}>
            {t("nav.insights")}
          </NavLink>
          <NavLink to="/lqip" className={linkCls}>
            {t("nav.lqip")}
          </NavLink>

          <div className="ml-auto flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
