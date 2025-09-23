export const CHART_PALETTE = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
] as const;

export function getSeriesColor(index: number, override?: string) {
  return override ?? CHART_PALETTE[index % CHART_PALETTE.length];
}

export const chartStyles = {
  gridStroke: "var(--chart-grid)",
  axisTick: { fill: "var(--chart-axis)" },
  axisLine: { stroke: "var(--chart-grid)" },
  tickLine: { stroke: "var(--chart-grid)" },
  tooltip: {
    contentStyle: {
      background: "var(--tooltip-bg)",
      border: "1px solid var(--tooltip-border)",
      color: "var(--tooltip-fg)",
    },
    labelStyle: { color: "var(--tooltip-fg)" },
    itemStyle: { color: "var(--tooltip-fg)" },
  },
  legend: { color: "var(--chart-axis)" },
};
