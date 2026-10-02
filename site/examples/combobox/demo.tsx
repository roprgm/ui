import { Combobox } from "@roprgm/ui/combobox";

const fonts = [
  "Geist",
  "Geist Mono",
  "Helvetica Neue",
  "IBM Plex Sans",
  "Inter",
  "JetBrains Mono",
  "Söhne",
  "SF Pro",
].map((font) => ({ value: font, label: font }));

export default function ComboboxDemo() {
  return (
    <Combobox
      raised
      aria-label="Font"
      items={fonts}
      placeholder="Search fonts"
      defaultValue="Geist"
      className="w-48"
    />
  );
}
