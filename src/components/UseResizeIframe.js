// useResizeIframe.js

import { useEffect } from "react";

export function useResizeIframe(ref, deps = []) {
  useEffect(() => {
    if (!ref.current) return;
    const resizeObserver = new window.ResizeObserver((entries) => {
      for (let entry of entries) {
        window.parent.postMessage(
          { type: "widgetResize", height: entry.contentRect.height },
          "*"
        );
        // Debug log:
        console.log("Widget: postMessage SENT!", entry.contentRect.height);
      }
    });
    resizeObserver.observe(ref.current);

    const sendResize = () => {
      if (ref.current) {
        const height = ref.current.getBoundingClientRect().height;
        window.parent.postMessage(
          { type: "widgetResize", height },
          "*"
        );
        console.log("Widget: Initial postMessage SENT!", height);
      }
    };
    sendResize();
    setTimeout(sendResize, 150);

    return () => resizeObserver.disconnect();
  }, deps);
}
