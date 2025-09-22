import { useEffect, useState } from "react";

export function useJson<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(url, { cache: "no-cache" })
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
        return r.json();
      })
      .then((d) => !cancelled && (setData(d), setLoading(false)))
      .catch((e) => !cancelled && (setError(e), setLoading(false)));
    return () => {
      cancelled = true;
    };
  }, [url]);

  return { data, error, loading };
}
