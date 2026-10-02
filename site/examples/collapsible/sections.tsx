import { Button } from "@roprgm/ui/button";
import { Card } from "@roprgm/ui/card";
import { Chevron } from "@roprgm/ui/chevron";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@roprgm/ui/collapsible";
import { Section } from "@roprgm/ui/section";

export default function CollapsibleSections() {
  return (
    <Card className="w-72">
      <Collapsible defaultOpen>
        <CollapsibleTrigger>
          <Chevron
            direction="right"
            className="text-secondary group-data-open/collapsible:rotate-90"
          />
          <span className="flex-1">Golden hour</span>
          <span className="text-secondary">2 min ago</span>
        </CollapsibleTrigger>
        <CollapsiblePanel>
          <Section className="gap-1 text-secondary">
            <span>Exposure +0.35</span>
            <span>Temperature +12</span>
            <span>Shadows +20</span>
          </Section>
          <Section className="flex-row justify-end gap-1.5 px-2.5">
            <Button variant="ghost">Revert</Button>
            <Button variant="primary">Apply</Button>
          </Section>
        </CollapsiblePanel>
      </Collapsible>
    </Card>
  );
}
