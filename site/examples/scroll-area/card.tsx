import { Card } from "@roprgm/ui/card";
import { IconButton } from "@roprgm/ui/icon-button";
import { ListItem } from "@roprgm/ui/list-item";
import { ScrollArea } from "@roprgm/ui/scroll-area";
import { Section, SectionAction } from "@roprgm/ui/section";
import { PlusIcon } from "@/ui/icons";

const effects = ["Vignette", "Grain", "Clarity", "Dehaze", "Sharpen", "Noise"];

export default function ScrollAreaInCard() {
  return (
    <Card className="h-64 w-64">
      <Section className="flex-row items-center">
        <h2 className="flex-1 font-medium">Effects</h2>
        <SectionAction>
          <IconButton label="Add effect">
            <PlusIcon />
          </IconButton>
        </SectionAction>
      </Section>
      <ScrollArea fade className="flex-1">
        {effects.map((effect) => (
          <ListItem key={effect}>{effect}</ListItem>
        ))}
      </ScrollArea>
    </Card>
  );
}
