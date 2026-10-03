import { Progress } from "@roprgm/ui/progress";

export default function ProgressIndeterminate() {
  return <Progress label="Preparing export" value={null} className="w-64" />;
}
