import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const linkCls = ({ isActive }: { isActive: boolean }) =>
  `px-2 py-1 rounded transition hover:underline ${isActive ? "underline" : ""}`;

export default function Nav() {
  return (
    <nav className="p-4 border-b flex items-center gap-4" aria-label="Primary">
      <NavLink to="/" end className={linkCls}>
        Insights
      </NavLink>
      <NavLink to="/gallery" className={linkCls}>
        Gallery
      </NavLink>
      <NavLink to="/about" className={linkCls}>
        About
      </NavLink>
      <div className="ml-auto">
        <ThemeToggle />
      </div>
    </nav>
  );
}
