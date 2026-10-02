import { Badge } from "@roprgm/ui/badge";

export default function BadgeDemo() {
  return (
    <>
      <span className="flex items-center gap-2">
        Kyoto in autumn <Badge>Draft</Badge>
      </span>
      <span className="flex items-center gap-2">
        Comments <Badge>3</Badge>
      </span>
    </>
  );
}
