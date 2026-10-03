import { Skeleton } from "@roprgm/ui/skeleton";

export default function SkeletonDemo() {
  return (
    <div className="flex w-64 flex-col gap-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}
