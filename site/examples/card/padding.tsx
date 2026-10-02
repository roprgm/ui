import { Card } from "@roprgm/ui/card";

export default function CardWithoutSections() {
  return (
    <Card className="w-64 gap-1">
      <span className="font-medium">Harbor at dusk</span>
      <span className="text-secondary">Lisbon, 12 March, 7:42 PM</span>
    </Card>
  );
}
