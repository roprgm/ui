import { Progress } from "@roprgm/ui/progress";

export default function ProgressBare() {
  return (
    <Progress aria-label="Storage used" value={7.2} max={10} className="w-64" />
  );
}
