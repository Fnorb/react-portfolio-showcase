import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useJson } from "../../hooks/useJson";
import Section from "../Section";

type Row = { date: string; visitors: number };

export default function VisitorsLineChart() {
  const { data, loading, error } = useJson<Row[]>("/data/visitors.json");

  if (loading) return <Section>Loading…</Section>;
  if (error || !data) return <Section>Fehler beim Laden.</Section>;

  return (
    <Section>
      <h2 className="text-lg font-semibold mb-4">Visitors</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 8, right: 12, bottom: 0, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="date" tickMargin={8} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="visitors"
              stroke="#60a5fa"
              dot={false}
              strokeWidth={2}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Section>
  );
}
