import { Card } from "@roprgm/ui/card";
import { Skeleton } from "@roprgm/ui/skeleton";

export default function SkeletonCard() {
  return (
    <Card className="w-72 flex-row items-center gap-3">
      <Skeleton className="size-8 rounded-full" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-3 w-20" />
      </div>
    </Card>
  );
}
