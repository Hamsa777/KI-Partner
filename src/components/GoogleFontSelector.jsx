const googleFonts = [
  "Inter", "Roboto", "Open Sans", "Lato", "Montserrat", "Poppins",
  "Raleway", "Ubuntu", "Nunito", "Work Sans", "Quicksand", "Rubik",
  "Merriweather", "DM Sans", "Oswald", "Manrope", "Playfair Display",
  "Karla", "Fira Sans"
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
