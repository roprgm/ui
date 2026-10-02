import { Combobox } from "@roprgm/ui/combobox";

const airports = [
  { value: "LIS", label: "Lisbon (LIS)" },
  { value: "OPO", label: "Porto (OPO)" },
  { value: "FNC", label: "Funchal (FNC)" },
  { value: "PDL", label: "Ponta Delgada (PDL)" },
  { value: "MAD", label: "Madrid (MAD)" },
  { value: "BCN", label: "Barcelona (BCN)" },
];

export default function ComboboxEmpty() {
  return (
    <Combobox
      raised
      aria-label="Destination"
      items={airports}
      placeholder="Fly to"
      empty="No airports match"
      className="w-56"
    />
  );
}
