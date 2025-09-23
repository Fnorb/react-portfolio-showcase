import Section from "../components/Section";
import { useTranslation } from "react-i18next";

export default function AboutPage() {
  const { t } = useTranslation("about");

  return (
    <div className="space-y-6 sm:space-y-8">
      <Section>
        <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="mt-2 text-balance">{t("lead")}</p>
      </Section>

      <Section>
        <h2 className="text-xl font-semibold">{t("stack")}</h2>
        {/* … Badges / Icons … */}
      </Section>

      <Section>
        <h2 className="text-xl font-semibold">{t("insights")}</h2>
        {/* … Charts / Cards … */}
      </Section>
    </div>
  );
}
