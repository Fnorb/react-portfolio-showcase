import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Section from "../Section";
import { useChartConfig } from "../../hooks/useChartParts";
import { chartStyles, getSeriesColor } from "../charts/chartTheme";

export default function TrafficPie() {
  const { config, loading, error } = useChartConfig("traffic-sources");

  if (loading) return <Section>Loading…</Section>;
  if (error || !config) return <Section>Fehler beim Laden.</Section>;

  const nameKey = config.x.dataKey as string;
  const valueKey = config.series[0]?.key as string;

  const hasValues =
    Array.isArray(config.data) &&
    !!valueKey &&
    config.data.every((d: any) => typeof d[valueKey] === "number");

  if (!hasValues) {
    console.warn("TrafficPie: data not numeric for", valueKey, config.data);
    return <Section>Datensatz fehlt oder hat keine numerischen Werte.</Section>;
  }

  return (
    <Section>
      <h2 className="text-lg font-semibold mb-4">{config.title}</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              contentStyle={chartStyles.tooltip.contentStyle}
              labelStyle={chartStyles.tooltip.labelStyle}
              itemStyle={chartStyles.tooltip.itemStyle}
              labelFormatter={(label, payload) =>
                (payload?.[0]?.payload?.[nameKey] as string) ?? String(label)
              }
              formatter={(val: number) => new Intl.NumberFormat().format(val)}
            />
            <Legend
              wrapperStyle={chartStyles.legend}
              formatter={(value, entry) => {
                const row = (entry?.payload as any) || {};
                const label = row?.[nameKey];
                return typeof label === "string"
                  ? label
                  : String(label ?? value);
              }}
            />
            <Pie
              data={config.data}
              dataKey={valueKey}
              nameKey={nameKey}
              outerRadius="80%"
              stroke="transparent"
            >
              {config.data.map((_, i) => (
                <Cell key={i} fill={getSeriesColor(i)} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Section>
  );
}
