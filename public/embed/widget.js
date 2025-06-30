// widget.js – Kundenfeedback-Widget mit Profilbild & Google-Overlay

(function () {
  const firmaId = document.currentScript.dataset.firmaid;
  if (!firmaId) return;

  // Fallback-Profilbild (SVG oder PNG)
  const FALLBACK_AVATAR = "https://www.svgrepo.com/show/382095/female-avatar-girl-face-woman-user-4.svg";
  // Google-Logo (transparent, am besten als PNG mit weißem Hintergrund)
  const GOOGLE_LOGO = "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg";

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
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .feedback-avatar-wrap {
      position: relative;
      width: 40px;
      height: 40px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .feedback-avatar-img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
      display: block;
      background: #eee;
    }
    .feedback-google-overlay {
      position: absolute;
      right: -7px;
      bottom: -7px;
      width: 21px;
      height: 21px;
      border-radius: 50%;
      background: #fff;
      border: 1.5px solid #eee;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
      box-shadow: 0 1px 3px rgba(0,0,0,0.08);
    }
    .feedback-google-overlay img {
      width: 15px;
      height: 15px;
      display: block;
    }
    .feedback-inner {
      flex: 1;
    }
    .feedback-name {
      font-weight: bold;
      color: #111;
      margin-bottom: 2px;
    }
    .feedback-comment {
      margin-top: 2px;
      color: #444;
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

          // Profilbild + Google Overlay
          const avatarWrap = document.createElement("div");
          avatarWrap.className = "feedback-avatar-wrap";

          const img = document.createElement("img");
          img.src = b.profilePhotoUrl || FALLBACK_AVATAR;
          img.alt = b.name + " Profilbild";
          img.className = "feedback-avatar-img";
          avatarWrap.appendChild(img);

          // Google Overlay unten rechts (überlappt leicht)
          const gOverlay = document.createElement("div");
          gOverlay.className = "feedback-google-overlay";
          const gImg = document.createElement("img");
          gImg.src = GOOGLE_LOGO;
          gImg.alt = "Google Logo";
          gOverlay.appendChild(gImg);
          avatarWrap.appendChild(gOverlay);

          card.appendChild(avatarWrap);

          // Text
          const inner = document.createElement("div");
          inner.className = "feedback-inner";

          const name = document.createElement("div");
          name.className = "feedback-name";
          name.textContent = b.name + ":";

          const comment = document.createElement("div");
          comment.className = "feedback-comment";
          comment.textContent = b.comment;

          inner.appendChild(name);
          inner.appendChild(comment);

          card.appendChild(inner);
          wrapper.appendChild(card);
        });
      }

      container.appendChild(wrapper);
    })
    .catch(() => {
      container.textContent = "Fehler beim Laden des Feedbacks.";
    });
})();
