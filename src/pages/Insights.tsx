import VisitorsLineChart from "../components/charts/VisitorsLineChart";
import SalesBarChart from "../components/charts/SalesBarChart";
import TrafficPie from "../components/charts/TrafficPie";
import ActiveUsersArea from "../components/charts/ActiveUsersArea";

export default function InsightsPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      {}
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
        <VisitorsLineChart />
        <TrafficPie />
        <SalesBarChart className="md:col-span-2" />
        <ActiveUsersArea />
      </div>
    </div>
  );
}
