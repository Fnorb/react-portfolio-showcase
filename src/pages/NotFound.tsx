import Section from "../components/Section";
export default function NotFound() {
  return (
    <Section>
      <h1 className="text-2xl font-semibold">404 — Seite nicht gefunden</h1>
      <p className="mt-2 opacity-80">Die angeforderte Seite existiert nicht.</p>
    </Section>
  );
}
