import { Tab, TabList, Tabs } from "@roprgm/ui/tabs";

const panels = [
  "Basic",
  "Tone curve",
  "Color mixer",
  "Color grading",
  "Detail",
  "Lens",
  "Geometry",
  "Effects",
];

export default function TabsOverflow() {
  return (
    <Tabs defaultValue="Basic" className="w-64">
      <TabList aria-label="Panels" className="overflow-fade-x">
        {panels.map((panel) => (
          <Tab key={panel} value={panel}>
            {panel}
          </Tab>
        ))}
      </TabList>
    </Tabs>
  );
}
