import { BrushIcon } from "@/ui/icons";

export default function UtilitiesShimmer() {
  return (
    <div className="flex w-64 flex-col gap-4">
      <span className="shimmer flex items-center gap-2 text-foreground">
        <BrushIcon /> Finding a source for the patch…
      </span>
      <div className="shimmer flex items-center gap-3">
        <span className="size-10 rounded-md bg-selected" />
        <span className="flex flex-1 flex-col gap-2">
          <span className="h-2.5 w-3/4 rounded-full bg-selected" />
          <span className="h-2.5 w-1/2 rounded-full bg-selected" />
        </span>
      </div>
    </div>
  );
}
