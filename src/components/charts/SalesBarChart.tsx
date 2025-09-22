import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useJson } from "../../hooks/useJson";
import Section from "../Section";
import { useState } from "react";

type Row = { label: string; desktop: number; mobile: number };

export default function SalesBarChart() {
  const { data, loading, error } = useJson<Row[]>(
    "/data/sales-by-quarter.json"
  );
  const [hidden, setHidden] = useState<{ [k: string]: boolean }>({});

  if (loading) return <Section>Loading…</Section>;
  if (error || !data) return <Section>Fehler beim Laden.</Section>;

  const onLegendClick = (o: any) =>
    setHidden((h) => ({ ...h, [o.dataKey]: !h[o.dataKey] }));

  return (
    <Section>
      <h2 className="text-lg font-semibold mb-4">Sales by Quarter</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 8, right: 12, bottom: 0, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend onClick={onLegendClick} />
            <Bar dataKey="desktop" fill="#34d399" hide={hidden.desktop} />
            <Bar dataKey="mobile" fill="#818cf8" hide={hidden.mobile} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Section>
  );
}
