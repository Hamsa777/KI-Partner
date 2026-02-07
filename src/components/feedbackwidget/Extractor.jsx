import { useCallback, useEffect, useRef, useState } from "react";

export default function useExtract(firmaId) {
  const [extract, setExtract] = useState("");
  const [loading, setLoading] = useState(true);

  // Trigger für manuelles Neuladen, ohne dass firmaId wechseln muss
  const [nonce, setNonce] = useState(0);

  // verhindert setState nach Unmount
  const isMounted = useRef(true);

  // öffentliches Refetch, z.B. nach "Generate/Save"
  const refetch = useCallback(() => {
    setNonce((n) => n + 1);
  }, []);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!firmaId) {
      setExtract("");
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchExtract = async () => {
      setLoading(true);

      try {
        // Cache-Busting: sorgt dafür, dass kein alter JSON-Cache gezogen wird
        const url = `https://feedback.ki-partner24.de/api/extract/${firmaId}.json?ts=${Date.now()}`;

        const response = await fetch(url, {
          cache: "no-store",
          signal: controller.signal,
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        });

        if (!response.ok) throw new Error("Extract nicht gefunden");

        const data = await response.json();
        const nextExtract = data?.extracted || "";

        if (isMounted.current) {
          setExtract(nextExtract);
        }
      } catch (error) {
        if (error?.name === "AbortError") return;

        console.error("Fehler beim Laden des Extracts:", error?.message || error);

        // wichtig: damit nicht der alte Text "hängen bleibt"
        if (isMounted.current) {
          setExtract("");
        }
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    };

    fetchExtract();

    return () => controller.abort();
  }, [firmaId, nonce]);

  return { extract, loading, refetch };
}
