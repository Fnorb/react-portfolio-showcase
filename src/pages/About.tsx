import Section from "../components/Section";

export default function AboutPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <Section>
        <h1 className="text-2xl font-semibold tracking-tight">About</h1>
        <p className="mt-2 text-balance">
          I am a frontend developer specializing in building exceptional digital
          experiences.
        </p>
      </Section>

      <Section>
        <h2 className="text-xl font-semibold">Tech Stack</h2>
        {}
      </Section>

      <Section>
        <h2 className="text-xl font-semibold">Insights</h2>
        {}
      </Section>
    </div>
  );
}
