import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Nav from "./components/Navi";
import { useEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();
  return (
    <div className="min-h-dvh bg-neutral-100 text-gray-900 dark:bg-neutral-950 dark:text-gray-100 antialiased">
      <Nav />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="p-6"
        >
          {}
          <div className="mx-auto w-full max-w-screen-lg px-2 sm:px-4">
            <ScrollToTop />
            <Outlet />
          </div>
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
