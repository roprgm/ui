import { Textarea } from "@roprgm/ui/textarea";

const itinerary = [
  "Day 1: Alfama at sunrise, then the tram to Belém.",
  "Day 2: Sintra, back for dinner in Bairro Alto.",
  "Day 3: Cascais and the coast road home.",
].join("\n");

export default function TextareaGrow() {
  return <Textarea defaultValue={itinerary} className="w-64" />;
}
