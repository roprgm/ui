import { Progress } from "@roprgm/ui/progress";

export default function ProgressDemo() {
  return (
    <Progress
      label="Uploading harbor.jpg"
      value={40}
      format={(v) => `${v}%`}
      className="w-64"
    />
  );
}
