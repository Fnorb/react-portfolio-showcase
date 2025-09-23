import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./i18n";
import "./index.css";
import App from "./App";

const Insights = lazy(() => import("./pages/Insights"));
const Gallery = lazy(() => import("./pages/Gallery"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Insights /> },
      { path: "gallery", element: <Gallery /> },
      { path: "about", element: <About /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<div className="p-6">Loading…</div>}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>
);
