export type Primitive = string | number | boolean | null;

export type DataRow = Record<string, Primitive>;

export type AxisType = "date" | "category" | "number";

export interface AxisConfig<D extends DataRow = DataRow> {
  dataKey: keyof D & string;
  label?: string;
  type?: AxisType;
  format?: string;
}

export interface SeriesConfig<D extends DataRow = DataRow> {
  key: keyof D & string;
  label: string;
  color?: string;
}

export interface ChartConfig<D extends DataRow = DataRow> {
  title: string;
  series: SeriesConfig<D>[];
  x: AxisConfig<D>;
  y?: { label?: string };
  data: D[];
}
