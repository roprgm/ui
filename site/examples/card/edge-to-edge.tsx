import { Card } from "@roprgm/ui/card";
import { ScrollText } from "@roprgm/ui/scroll-text";
import { Section } from "@roprgm/ui/section";
import { cn } from "cn";

const presets = [
  { name: "Golden hour", tint: "from-amber-500 to-rose-700" },
  { name: "Blue hour", tint: "from-sky-500 to-indigo-800" },
  { name: "Matte", tint: "from-stone-400 to-stone-700" },
  { name: "Portra", tint: "from-orange-300 to-teal-700" },
  { name: "Noir", tint: "from-neutral-300 to-neutral-900" },
  { name: "Fjord", tint: "from-cyan-300 to-slate-700" },
];

export default function CardEdgeToEdge() {
  return (
    <Card className="w-72">
      <Section>
        <h2 className="font-medium">Presets</h2>
      </Section>
      <Section className="px-0">
        <div className="flex gap-2 overflow-fade-x px-3.5">
          {presets.map((preset) => (
            <button
              key={preset.name}
              type="button"
              className="flex w-16 shrink-0 cursor-pointer flex-col gap-1.5 rounded-md text-secondary focus-ring hover:text-foreground"
            >
              <span
                className={cn(
                  "aspect-square rounded-md bg-linear-to-br",
                  preset.tint,
                )}
              />
              <span className="truncate">{preset.name}</span>
            </button>
          ))}
        </div>
      </Section>
      <Section className="text-secondary">
        <ScrollText>
          Canon EOS R5 · RF 24–70mm F2.8 · ƒ/2.8 · 1/250 s · ISO 100 · 8192 ×
          5464
        </ScrollText>
      </Section>
    </Card>
  );
}
