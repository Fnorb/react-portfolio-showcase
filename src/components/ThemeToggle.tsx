import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const ls = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initial =
      (ls as "light" | "dark") ?? (prefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
    document.documentElement.style.colorScheme = initial;
  }, []);

  const toggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    document.documentElement.style.colorScheme = newTheme;
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="rounded-md border px-3 py-1.5 text-sm cursor-pointer hover:bg-black/5 dark:hover:bg-white/10"
      title="Toggle theme"
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}
