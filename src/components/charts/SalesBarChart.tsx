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
import Section from "../Section";
import { useChartConfig } from "../../hooks/useChartParts";
import { chartStyles, getSeriesColor } from "../charts/chartTheme";

export default function SalesBarChart() {
  const { config, loading, error, lang } = useChartConfig("sales-by-quarter");

  if (loading) return <Section>Loading…</Section>;
  if (error || !config) return <Section>Fehler beim Laden.</Section>;

  const fmtNumber = (n: number) => new Intl.NumberFormat(lang).format(n);

  return (
    <Section>
      <h2 className="text-lg font-semibold mb-4">{config.title}</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={config.data}
            margin={{ top: 8, right: 12, bottom: 0, left: 0 }}
          >
            <CartesianGrid
              stroke={chartStyles.gridStroke}
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey={config.x.dataKey}
              tick={chartStyles.axisTick}
              axisLine={chartStyles.axisLine}
              tickLine={chartStyles.tickLine}
            />
            <YAxis
              tickFormatter={fmtNumber}
              tick={chartStyles.axisTick}
              axisLine={chartStyles.axisLine}
              tickLine={chartStyles.tickLine}
            />
            <Tooltip
              formatter={(v: number) => fmtNumber(v)}
              contentStyle={chartStyles.tooltip.contentStyle}
              labelStyle={chartStyles.tooltip.labelStyle}
              itemStyle={chartStyles.tooltip.itemStyle}
            />
            <Legend wrapperStyle={chartStyles.legend} />
            {config.series.map((s, i) => {
              const color = getSeriesColor(i, s.color);
              return (
                <Bar
                  key={s.key}
                  dataKey={s.key}
                  name={s.label}
                  fill={color}
                  radius={[6, 6, 0, 0]}
                />
              );
            })}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Section>
  );
}
