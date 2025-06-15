import { useState, useEffect } from 'react';

const googleFonts = [
  // 🟦 Sans-Serif (moderne Fließtexte)
  "Assistant", "Average Sans", "Barlow", "Barlow Semi Condensed", "Bebas Neue",
  "Cabin", "Catamaran", "Charter", "Comfortaa", "Cormorant Garamond", "Corranada",
  "Cuprum", "DM Sans", "Dosis", "Ek Mukta", "Exo", "Exo 2", "Fira Sans",
  "Fredoka", "Hind", "Inter", "Jost", "Josefin Sans", "Kanit", "Karla",
  "Khand", "Lato", "Manrope", "Maven Pro", "Montserrat", "Muli",
  "Noto Sans", "Nunito", "Nunito Sans", "Open Sans", "Oswald",
  "Overpass", "Oxanium", "Poppins", "Prompt", "Proza Libre", "Public Sans",
  "Quicksand", "Rajdhani", "Raleway", "Red Hat Display", "Roboto",
  "Rubik", "Saira", "Saira Semi Condensed", "Signika", "Sonora", "Sora",
  "Source Sans Pro", "Space Grotesk", "Teko", "Tenor Sans", "Ubuntu",
  "Urbanist", "Varela Round", "Work Sans", "Yong",

  // 🟨 Serif (klassisch, edel, für Fließtext oder Headlines)
  "Alegreya", "Arvo", "Bitter", "Cardo", "Cormorant", "Crimson Pro",
  "Domine", "EB Garamond", "Faustina", "Frei", "Gentium Basic",
  "IBM Plex Serif", "Lora", "Merriweather", "Noto Serif", "Playfair Display",
  "PT Serif", "Quattrocento", "Roboto Slab", "Rosario", "Spectral",
  "Tinos", "Vollkorn", "Zilla Slab",

  // 🟪 Display / Dekorativ (Überschriften, Branding)
  "Abril Fatface", "Alfa Slab One", "Amatic SC", "Anton", "Black Ops One",
  "Coda", "Cookie", "Fredoka One", "Great Vibes", "Kaushan Script",
  "Lobster", "Luckiest Guy", "Pacifico", "Patua One", "Press Start 2P",
  "Risque", "Satisfy", "Ultra", "Unica One", "Yellowtail",

  // 🟥 Monospace (Code, Technik)
  "Cousine", "IBM Plex Mono", "Inconsolata", "Quantico", "Roboto Mono",
  "Source Code Pro", "Space Mono"
];


export default function GoogleFontSelector({ font, setFont }) {
  const [search, setSearch] = useState('');
  const [filteredFonts, setFilteredFonts] = useState(googleFonts);

  useEffect(() => {
    const filtered = googleFonts.filter(f =>
      f.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredFonts(filtered);
  }, [search]);

  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Schrift suchen..."
        className="p-2 border rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="w-full p-2 border rounded"
        value={font}
        onChange={(e) => setFont(e.target.value)}
      >
        {filteredFonts.map((f) => (
          <option key={f} value={f}>{f}</option>
        ))}
      </select>
    </div>
  );
}
