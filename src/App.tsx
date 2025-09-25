import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Nav from "./components/Navi";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();
  const prefersReduced = useReducedMotion();
  return (
    <div className="min-h-dvh bg-neutral-100 text-gray-900 dark:bg-neutral-950 dark:text-gray-100 antialiased">
      <Nav />
      <AnimatePresence mode="wait" initial={!prefersReduced}>
        <motion.main
          key={location.pathname}
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReduced ? undefined : { opacity: 0 }}
          transition={
            prefersReduced
              ? { duration: 0 }
              : { duration: 0.18, ease: "easeOut" }
          }
          className="p-6"
        >
          <div className="mx-auto w-full max-w-screen-lg px-2 sm:px-4">
            <ScrollToTop />
            <ErrorBoundary>
              <Outlet />
            </ErrorBoundary>
          </div>
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
