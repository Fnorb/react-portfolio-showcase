import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div className="p-6 space-y-6">
      <nav className="flex gap-4 border-b pb-2">
        <Link to="/">Insights</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/about">About</Link>
      </nav>
      <Outlet />
    </div>
  );
}
