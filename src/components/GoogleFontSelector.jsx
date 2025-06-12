const googleFonts = [
 "Inter", "Roboto", "Open Sans", "Lato", "Noto Sans", "Montserrat", "Poppins",
  "Raleway", "Ubuntu", "Nunito", "Work Sans", "Quicksand", "Rubik",
  "Merriweather", "DM Sans", "Oswald", "Manrope", "Playfair Display",
  "Karla", "Fira Sans","Cabin", "Kanit", "Urbanist", "Rajdhani",
  "Exo 2", "Saira Semi Condensed", "Coda", "Patua One", "Oxanium",
  "Chakra Petch", "Quantico", "Cormorant Garamond", "EB Garamond",
  "Lora", "Crimson Pro", "Barlow", "Sora", "Prompt", "Baloo 2", "Fredoka"
];

export default function GoogleFontSelector({ font, setFont }) {
  return (
    <select
      className="w-full p-2 border"
      value={font}
      onChange={(e) => setFont(e.target.value)}
    >
      {googleFonts.map((f) => (
        <option key={f} value={f}>{f}</option>
      ))}
    </select>
  );
}
