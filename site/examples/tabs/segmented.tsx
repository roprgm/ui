import { Tab, TabList, Tabs } from "@roprgm/ui/tabs";

export default function TabsSegmented() {
  return (
    <Tabs defaultValue="hue">
      <TabList aria-label="Channel" variant="segmented">
        <Tab value="hue">Hue</Tab>
        <Tab value="saturation">Saturation</Tab>
        <Tab value="luminance">Luminance</Tab>
      </TabList>
    </Tabs>
  );
}
