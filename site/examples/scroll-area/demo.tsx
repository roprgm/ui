import { ScrollArea } from "@roprgm/ui/scroll-area";

export default function ScrollAreaDemo() {
  return (
    <ScrollArea fade className="h-48 w-64 rounded-lg bg-field/60">
      <ol className="flex flex-col gap-2 p-3 text-secondary">
        {Array.from({ length: 24 }, (_, index) => (
          <li key={index}>Step {index + 1}: Exposure +0.1</li>
        ))}
      </ol>
    </ScrollArea>
  );
}
