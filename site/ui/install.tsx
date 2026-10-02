import { Tab, TabList, TabPanel, Tabs } from "@roprgm/ui/tabs";
import { Code } from "./code";
import { exportsOf } from "./source";

/** How to add a component: from the package, or as source through shadcn. */
export async function Install({ name }: { name: string }) {
  const exports = await exportsOf(name);
  return (
    <Tabs defaultValue="package" className="flex flex-col gap-3">
      <TabList variant="underline">
        <Tab value="package">Package</Tab>
        <Tab value="shadcn">shadcn</Tab>
      </TabList>
      <TabPanel value="package" className="flex flex-col gap-2">
        <Code>bun add @roprgm/ui</Code>
        <Code lang="tsx">{`import { ${exports} } from "@roprgm/ui/${name}";`}</Code>
      </TabPanel>
      <TabPanel value="shadcn" className="flex flex-col gap-2">
        <Code>{`npx shadcn@latest add https://ui.roprgm.com/r/${name}.json`}</Code>
        <Code lang="tsx">{`import { ${exports} } from "@/components/ui/${name}";`}</Code>
      </TabPanel>
    </Tabs>
  );
}
