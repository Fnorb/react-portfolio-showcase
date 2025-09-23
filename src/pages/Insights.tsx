import VisitorsLineChart from "../components/charts/VisitorsLineChart";
import SalesBarChart from "../components/charts/SalesBarChart";
import TrafficPie from "../components/charts/TrafficPie";
import ActiveUsersArea from "../components/charts/ActiveUsersArea";
import Section from "../components/Section";
import { useTranslation } from "react-i18next";

export default function InsightsPage() {
  const { t } = useTranslation("insights");

  return (
    <div className="space-y-6 sm:space-y-8">
      <Section>
        <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
      </Section>

      <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
        <VisitorsLineChart />
        <TrafficPie />
        <SalesBarChart />
        <ActiveUsersArea />
      </div>
    </div>
  );
}
