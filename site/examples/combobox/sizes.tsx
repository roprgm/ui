import { Combobox } from "@roprgm/ui/combobox";

const countries = [
  "France",
  "Greece",
  "Italy",
  "Japan",
  "Mexico",
  "Portugal",
  "Spain",
  "Thailand",
].map((country) => ({ value: country, label: country }));

export default function ComboboxSizes() {
  return (
    <>
      <Combobox
        raised
        aria-label="Country"
        items={countries}
        placeholder="Country"
        className="w-40"
      />
      <Combobox
        raised
        size="lg"
        aria-label="Country"
        items={countries}
        placeholder="Country"
        className="w-44"
      />
    </>
  );
}
