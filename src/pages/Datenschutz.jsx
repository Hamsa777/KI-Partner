import React from "react";

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-white text-[#000000] px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Datenschutzerklärung</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">1. Verantwortlicher</h2>
        <p>
          <strong>Hamsa Lif / KI-Partner</strong><br />
          Scharhoferstr. 54, 68307 Mannheim<br />
          E-Mail: info@ki-partner24.de<br />
          {/* [Optional: Telefonnummer] */}
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">2. Allgemeines zur Datenverarbeitung</h2>
        <p>
          Wir verarbeiten personenbezogene Daten nur, soweit dies zur
          Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte
          und Leistungen erforderlich ist. Eine Weitergabe an Dritte erfolgt
          ausschließlich im Rahmen gesetzlicher Vorgaben.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">3. Hosting</h2>
        <p>
          Unsere Website wird bei <strong>Vercel</strong> gehostet. Anbieter ist Vercel Inc.,
          440 N Barranca Ave #4133, Covina, CA 91723, USA. Vercel verarbeitet
          technische Zugriffsdaten zur Bereitstellung und Sicherheit der Website.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">4. Zahlungsabwicklung über Stripe</h2>
        <p>
          Für die Zahlungsabwicklung nutzen wir <strong>Stripe</strong>. Anbieter ist Stripe
          Payments Europe, Ltd., 1 Grand Canal Street Lower, Grand Canal Dock,
          Dublin, Irland. Details finden Sie in der{" "}
          <a
            href="https://stripe.com/de/privacy"
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Stripe-Datenschutzerklärung
          </a>.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">5. Formulare & Automatisierung</h2>
        <p>
          Formulare werden über <strong>Tally</strong> eingebunden. Die Einträge werden automatisiert
          über <strong>Make</strong> in <strong>Google Sheets</strong> gespeichert und zur weiteren Verarbeitung (z. B. E-Mail-Versand)
          verwendet. Dabei erfolgt keine Datenübertragung in Drittländer.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">6. E-Mail-Versand</h2>
        <p>
          Benachrichtigungen und automatische Antworten werden DSGVO-konform über
          <strong> Google Workspace SMTP</strong> durch <strong>Make</strong> versendet.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">7. Google Fonts</h2>
        <p>
          In unserem Editor bieten wir Google Fonts zur Auswahl an. Diese werden
          erst geladen, wenn Sie sie im veröffentlichten Widget aktiv nutzen.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">8. Bewertungen & Widget-Konfiguration</h2>
        <p>
          Bewertungen und Widget-Konfigurationen (Farben, Texte, Design) werden
          auf unserem Server gespeichert. Die Daten sind nur über die zugehörige
          Einbettung öffentlich einsehbar.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">9. Ihre Rechte</h2>
        <p>
          Sie haben das Recht auf Auskunft, Berichtigung, Löschung,
          Einschränkung, Datenübertragbarkeit sowie Widerspruch gegen die
          Verarbeitung Ihrer personenbezogenen Daten. Außerdem haben Sie das
          Recht, sich bei einer Aufsichtsbehörde zu beschweren.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">10. Änderungen</h2>
        <p>
          Wir behalten uns vor, diese Datenschutzerklärung bei Änderungen der
          Gesetzeslage oder unseres Angebots zu aktualisieren. Bitte informieren
          Sie sich regelmäßig über den aktuellen Stand.
        </p>
      </section>
    </div>
  );
}
