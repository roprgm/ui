import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@roprgm/ui/accordion";
import { Card } from "@roprgm/ui/card";
import { Chevron } from "@roprgm/ui/chevron";
import { Section } from "@roprgm/ui/section";
import { Switch } from "@roprgm/ui/switch";

const groups = [
  { title: "Canvas", settings: ["Show grid", "Snap to guides"] },
  { title: "History", settings: ["Keep every step", "Name steps"] },
];

export default function AccordionMultiple() {
  return (
    <Card className="w-72">
      <Section>
        <h2 className="font-medium">Preferences</h2>
      </Section>
      <Accordion multiple defaultValue={["Canvas", "History"]}>
        {groups.map((group) => (
          <AccordionItem key={group.title} value={group.title}>
            <AccordionTrigger>
              <Chevron
                direction="right"
                className="text-secondary group-data-open/collapsible:rotate-90"
              />
              {group.title}
            </AccordionTrigger>
            <AccordionPanel>
              {group.settings.map((setting) => (
                <label
                  key={setting}
                  className="flex items-center justify-between gap-2"
                >
                  {setting} <Switch defaultChecked />
                </label>
              ))}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
}
