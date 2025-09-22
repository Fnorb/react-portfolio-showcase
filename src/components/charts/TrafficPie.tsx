import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useJson } from "../../hooks/useJson";
import Section from "../Section";

type Row = { name: string; value: number };

const COLORS = ["#60a5fa", "#34d399", "#fbbf24", "#f472b6"];

export default function TrafficPie() {
  const { data, loading, error } = useJson<Row[]>("/data/traffic-sources.json");

  if (loading) return <Section>Loading…</Section>;
  if (error || !data) return <Section>Fehler beim Laden.</Section>;

  return (
    <Section>
      <h2 className="text-lg font-semibold mb-4">Traffic Sources</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip />
            <Legend />
            <Pie data={data} dataKey="value" nameKey="name" outerRadius="80%">
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Section>
  );
}
