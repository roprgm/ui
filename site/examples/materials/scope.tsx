import { Button } from "@roprgm/ui/button";
import { Toggle, ToggleGroup } from "@roprgm/ui/toggle-group";

function Bar({ name, className }: { name: string; className: string }) {
  return (
    <div className={className}>
      <ToggleGroup aria-label="Zoom">
        <Toggle name={name} value="fit" defaultChecked>
          Fit
        </Toggle>
        <Toggle name={name} value="fill">
          Fill
        </Toggle>
      </ToggleGroup>
      <Button>Export</Button>
    </div>
  );
}

export default function MaterialScope() {
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-4 rounded-lg bg-[linear-gradient(to_bottom,#3b6ea5_0%,#f0a868_55%,#2e3a4a_100%)] p-8">
      <Bar
        name="float"
        className="flex items-center gap-1.5 rounded-xl p-1.5 material-float"
      />
      {/* A scope of glass: its controls and fields lie flat and translucent. */}
      <Bar
        name="glass"
        className="flex items-center gap-1.5 rounded-xl bg-[oklch(20%_0_0/0.45)] p-1.5 shadow-[inset_0_0_0_1px_oklch(100%_0_0/0.12)] backdrop-blur-md [--color-control-hover:oklch(100%_0_0/0.22)] [--color-control:oklch(100%_0_0/0.14)] [--color-field:oklch(0%_0_0/0.18)] [--shadow-control:none] [--shadow-field:none]"
      />
    </div>
  );
}
