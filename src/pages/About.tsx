import Section from "../components/Section";
import { useTranslation } from "react-i18next";
import CheckList from "../components/content/CheckList";
import { H1, H2 } from "../components/content/Headings";

export default function AboutPage() {
  const { t } = useTranslation("about");

  const featKeys = ["page-feat-1", "page-feat-2", "page-feat-3", "page-feat-4"];
  const stackKeys = [
    "stack-tech-1",
    "stack-tech-2",
    "stack-tech-3",
    "stack-tech-4",
    "stack-tech-5",
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <Section>
        <H1>{t("about-title")}</H1>
        <p className="mt-2 text-balance">{t("about-1")}</p>
        <p className="mt-2 text-balance">{t("about-2")}</p>
      </Section>

      <Section>
        <H2>{t("page-title")}</H2>
        <p className="mt-2 text-balance">{t("page-description")}</p>
        <CheckList items={featKeys.map((k) => t(k))} />
      </Section>

      <Section>
        <H2>{t("stack-title")}</H2>
        <p className="mt-2 text-balance">{t("stack-description")}</p>
        <CheckList items={stackKeys.map((k) => t(k))} />
      </Section>
    </div>
  );
}
