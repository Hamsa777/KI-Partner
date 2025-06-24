import { useEffect, useCallback } from "react";

export function useIframeResize(ref, deps = []) {
  const sendResize = useCallback(() => {
    if (ref.current) {
      const height = ref.current.getBoundingClientRect().height;
      window.parent.postMessage(
        { type: "widgetResize", height },
        "*"
      );
    }
  }, [ref]);
useEffect(() => {
  console.log("📦 useIframeResize ausgelöst!", deps);
  // ... Rest wie bisher ...
}, deps);

  useEffect(() => {
    if (!ref.current) return;
    sendResize();
    const t1 = setTimeout(sendResize, 250);
    const t2 = setTimeout(sendResize, 750);
    const t3 = setTimeout(sendResize, 1500);

    const resizeObserver = new window.ResizeObserver(() => sendResize());
    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
    // eslint-disable-next-line
  }, deps);

  return sendResize;
}
