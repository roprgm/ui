import { Badge } from "@roprgm/ui/badge";

export default function BadgeStates() {
  return (
    <>
      <Badge variant="outline" className="text-success">
        Synced
      </Badge>
      <Badge variant="outline" className="text-warning">
        Expiring
      </Badge>
      <Badge variant="outline" className="text-danger">
        Failed
      </Badge>
    </>
  );
}
