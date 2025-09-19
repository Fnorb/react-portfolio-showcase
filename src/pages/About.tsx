export default function About() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">About</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">Tech Stack</p>

      <ul className="list-disc list-inside space-y-1">
        <li>React & TypeScript</li>
        <li>Tailwind CSS</li>
        <li>Data Visualization (Recharts)</li>
        <li>Modern Frontend Tooling</li>
      </ul>
    </section>
  );
}
