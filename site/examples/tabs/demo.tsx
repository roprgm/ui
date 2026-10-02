import { Tab, TabList, TabPanel, Tabs } from "@roprgm/ui/tabs";

export default function TabsDemo() {
  return (
    <Tabs defaultValue="layers" className="flex w-64 flex-col gap-3">
      <TabList aria-label="Sidebar">
        <Tab value="layers">Layers</Tab>
        <Tab value="history">History</Tab>
        <Tab value="info">Info</Tab>
      </TabList>
      <TabPanel value="layers" className="px-3 text-secondary">
        Sky, Subject, and Image.
      </TabPanel>
      <TabPanel value="history" className="px-3 text-secondary">
        Three edits since the import.
      </TabPanel>
      <TabPanel value="info" className="px-3 text-secondary">
        Canon EOS R5, 1/250 s at ƒ/2.8.
      </TabPanel>
    </Tabs>
  );
}
