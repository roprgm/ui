import { Tab, TabList, Tabs } from "@roprgm/ui/tabs";

export default function TabsUnderline() {
  return (
    <Tabs defaultValue="photos">
      <TabList aria-label="Trip" variant="underline">
        <Tab value="photos">Photos</Tab>
        <Tab value="map">Map</Tab>
        <Tab value="people">People</Tab>
      </TabList>
    </Tabs>
  );
}
