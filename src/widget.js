// widget.js – mehrfach einbettbares Kundenfeedback-Widget mit Styling

(function () {
  const firmaId = document.currentScript.dataset.firmaid;
  if (!firmaId) return;

  // Widget-Container erstellen
  const container = document.createElement("div");
  container.style.width = "100%";
  container.style.maxWidth = "500px";
  container.style.margin = "20px auto";
  container.style.fontFamily = "sans-serif";
  document.currentScript.insertAdjacentElement("afterend", container);

  // Styles hinzufügen
  const style = document.createElement("style");
  style.textContent = `
    .feedback-card {
      background: #fff;
      border-radius: 10px;
      padding: 15px;
      margin-bottom: 12px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.05);
      border-left: 4px solid #ca1b5a;
    }
    .feedback-name {
      font-weight: bold;
      color: #111;
    }
    .feedback-comment {
      margin-top: 4px;
      color: #444;
    }
    .feedback-wrapper {
      padding: 10px;
    }
  `;
  document.head.appendChild(style);

  // Widget laden
  fetch(`https://feedback.ki-partner24.de/api/feedback/${firmaId}`)
    .then(res => res.json())
    .then(data => {
      const wrapper = document.createElement("div");
      wrapper.className = "feedback-wrapper";

      if (!data || data.length === 0) {
        wrapper.textContent = "Noch keine Bewertungen vorhanden.";
      } else {
        data.forEach((b) => {
          const card = document.createElement("div");
          card.className = "feedback-card";

          const name = document.createElement("div");
          name.className = "feedback-name";
          name.textContent = b.name + ":";

          const comment = document.createElement("div");
          comment.className = "feedback-comment";
          comment.textContent = b.comment;

          card.appendChild(name);
          card.appendChild(comment);
          wrapper.appendChild(card);
        });
      }

      container.appendChild(wrapper);
    })
    .catch(() => {
      container.textContent = "Fehler beim Laden des Feedbacks.";
    });
})();