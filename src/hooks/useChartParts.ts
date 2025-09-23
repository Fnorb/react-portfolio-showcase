import { useEffect, useState } from "react";
import i18n from "../i18n";

type Primitive = string | number | boolean | null;
type Row = Record<string, Primitive>;

export type Labels = {
  title: string;
  x: {
    dataKey: string;
    type?: "date" | "category" | "number";
    format?: string;
    label?: string;
  };
  y?: { label?: string };
  series: { key: string; label: string; color?: string }[];
};

function baseLng(lng?: string) {
  return (lng || "en").toLowerCase().split("-")[0];
}

export function useChartParts(chartId: string) {
  const [data, setData] = useState<Row[] | null>(null);
  const [labels, setLabels] = useState<Labels | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lang, setLang] = useState(() => baseLng(i18n.resolvedLanguage));

  useEffect(() => {
    const handler = (lng: string) => setLang(baseLng(lng));
    i18n.on("languageChanged", handler);
    return () => i18n.off("languageChanged", handler);
  }, []);

  useEffect(() => {
    let cancel = false;
    setLoading(true);
    setError(null);

    const load = async () => {
      try {
        const dataRes = await fetch(`/charts/${chartId}/data.json`, {
          cache: "no-cache",
        });
        if (!dataRes.ok) throw new Error("data not found");
        const d: Row[] = await dataRes.json();

        const tryLabels = [
          `/charts/${chartId}/labels.${lang}.json`,
          `/charts/${chartId}/labels.en.json`,
        ];
        let l: Labels | null = null;
        for (const url of tryLabels) {
          const r = await fetch(url, { cache: "no-cache" });
          if (r.ok) {
            l = await r.json();
            break;
          }
        }
        if (!l) throw new Error("labels not found");

        if (!cancel) {
          setData(d);
          setLabels(l);
          setLoading(false);
        }
      } catch (e: unknown) {
        if (!cancel) {
          setError(e instanceof Error ? e : new Error("load failed"));
          setLoading(false);
        }
      }
    };

    load();
    return () => {
      cancel = true;
    };
  }, [chartId, lang]);

  return { data, labels, loading, error, lang };
}

export function useChartConfig(chartId: string) {
  const { data, labels, loading, error, lang } = useChartParts(chartId);
  const config =
    data && labels
      ? {
          title: labels.title,
          x: labels.x,
          y: labels.y,
          series: labels.series,
          data,
        }
      : null;
  return { config, loading, error, lang };
}
