// src/App.tsx
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  const location = useLocation();
  return (
    <div className="min-h-dvh">
      <nav className="p-4 border-b flex gap-4">
        <NavLink to="/" end>
          Insights
        </NavLink>
        <NavLink to="/gallery">Gallery</NavLink>
        <NavLink to="/about">About</NavLink>
        <ThemeToggle />
      </nav>

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="p-6"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
