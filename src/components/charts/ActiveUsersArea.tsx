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
import ChartSkeleton from "../ChartSkeleton";
import Section from "../Section";
import { useChartConfig } from "../../hooks/useChartParts";
import { chartStyles, getSeriesColor } from "../charts/chartTheme";

export default function ActiveUsersArea() {
  const { config, loading, error, lang } = useChartConfig("active-users");

  if (loading)
    return (
      <Section>
        <ChartSkeleton />
      </Section>
    );
  if (error || !config) return <Section>Fehler beim Laden.</Section>;

  const isDate = config.x?.type === "date";
  const fmtDate = (s: string) =>
    isDate
      ? new Intl.DateTimeFormat(lang, {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).format(new Date(s))
      : String(s);
  const fmtNumber = (n: number) => new Intl.NumberFormat(lang).format(n);

  return (
    <Section>
      <h2 className="text-lg font-semibold mb-4">{config.title}</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={config.data}
            margin={{ top: 8, right: 12, bottom: 0, left: 0 }}
          >
            <CartesianGrid
              stroke={chartStyles.gridStroke}
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey={config.x.dataKey}
              tickFormatter={fmtDate}
              tickMargin={8}
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
              labelFormatter={fmtDate}
              formatter={(v: number) => fmtNumber(v)}
              contentStyle={chartStyles.tooltip.contentStyle}
              labelStyle={chartStyles.tooltip.labelStyle}
              itemStyle={chartStyles.tooltip.itemStyle}
            />
            <Legend wrapperStyle={chartStyles.legend} />
            {config.series.map((s, i) => {
              const color = getSeriesColor(i, s.color);
              return (
                <Area
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  name={s.label}
                  stroke={color}
                  fill={color}
                  fillOpacity={0.22}
                  activeDot={{ r: 5 }}
                />
              );
            })}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Section>
  );
}
