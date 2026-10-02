import { Card } from "@roprgm/ui/card";
import { Chevron } from "@roprgm/ui/chevron";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@roprgm/ui/collapsible";

const edits = [
  {
    title: "Golden hour",
    when: "2 min ago",
    steps: ["Exposure +0.35", "Temperature +12", "Shadows +20"],
  },
  { title: "Crop", when: "5 min ago", steps: ["Aspect 3:2", "Angle 1.5°"] },
];

export default function CollapsibleDemo() {
  return (
    <div className="flex w-72 flex-col gap-2">
      {edits.map((edit) => (
        <Card key={edit.title} className="rounded-lg">
          <Collapsible>
            <CollapsibleTrigger>
              <Chevron
                direction="right"
                className="text-secondary group-data-open/collapsible:rotate-90"
              />
              <span className="flex-1">{edit.title}</span>
              <span className="text-secondary">{edit.when}</span>
            </CollapsibleTrigger>
            <CollapsiblePanel>
              <ol className="flex flex-col gap-1 text-secondary">
                {edit.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </CollapsiblePanel>
          </Collapsible>
        </Card>
      ))}
    </div>
  );
}
