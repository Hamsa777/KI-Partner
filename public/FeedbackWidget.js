console.log("✅ FeedbackWidget direkt geladen");

(function () {
  const { useState, useEffect, useRef } = React;

  function FeedbackWidget({ firmaId }) {
    const [bewertungen, setBewertungen] = useState([]);
    const [loading, setLoading] = useState(true);
    const ref = useRef(null);

    useEffect(() => {
      fetch(`https://feedback.ki-partner24.de/api/feedback/${firmaId}`)
        .then((res) => res.json())
        .then((data) => {
          setBewertungen(data);
          setLoading(false);
        });
    }, [firmaId]);

    return React.createElement(
      "div",
      { style: { padding: "10px", background: "#fff", borderRadius: "8px" } },
      loading
        ? "Lade Feedback..."
        : bewertungen.map((b, i) =>
            React.createElement("div", { key: i }, `${b.name}: ${b.comment}`)
          )
    );
  }

  const firmaId = "demo123"; // Hardcoded zum Testen
  const root = document.getElementById("widget-root");
  ReactDOM.createRoot(root).render(React.createElement(FeedbackWidget, { firmaId }));
})();
