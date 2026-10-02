import { Badge } from "@roprgm/ui/badge";

export default function BadgeSizes() {
  return (
    <>
      <span className="flex items-center gap-2">
        Comments <Badge>3</Badge>
      </span>
      <span className="flex items-center gap-2">
        Photos <Badge size="sm">860</Badge>
      </span>
      <span className="flex h-6.5 items-center gap-2 rounded-md bg-selected px-2">
        Albums <Badge size="xs">12</Badge>
      </span>
    </>
  );
}
