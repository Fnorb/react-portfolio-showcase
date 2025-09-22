import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useJson } from "../../hooks/useJson";
import Section from "../Section";

type Row = { date: string; web: number; mobile: number };

export default function ActiveUsersArea() {
  const { data, loading, error } = useJson<Row[]>("/data/active-users.json");

  if (loading) return <Section>Loading…</Section>;
  if (error || !data) return <Section>Fehler beim Laden.</Section>;

  return (
    <Section>
      <h2 className="text-lg font-semibold mb-4">
        Active Users (Web vs. Mobile)
      </h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 8, right: 12, bottom: 0, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="date" tickMargin={8} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="web"
              stackId="a"
              stroke="#60a5fa"
              fill="#60a5fa33"
            />
            <Area
              type="monotone"
              dataKey="mobile"
              stackId="a"
              stroke="#34d399"
              fill="#34d39933"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Section>
  );
}
