import { Button } from "@roprgm/ui/button";
import { Card } from "@roprgm/ui/card";
import { IconButton } from "@roprgm/ui/icon-button";
import { Section, SectionAction } from "@roprgm/ui/section";
import { MoreIcon, PlusIcon } from "@/ui/icons";

export default function CardDemo() {
  return (
    <Card className="w-72">
      <Section className="flex-row items-center">
        <h2 className="flex-1 font-medium">Golden hour</h2>
        <SectionAction>
          <IconButton label="Add adjustment">
            <PlusIcon />
          </IconButton>
          <IconButton label="More">
            <MoreIcon />
          </IconButton>
        </SectionAction>
      </Section>
      <Section className="gap-1 text-secondary">
        <span>Exposure +0.35</span>
        <span>Temperature +12</span>
        <span>Shadows +20</span>
      </Section>
      <Section className="flex-row justify-end gap-1.5 p-1.5">
        <Button variant="ghost">Revert</Button>
        <Button>Apply</Button>
      </Section>
    </Card>
  );
}
