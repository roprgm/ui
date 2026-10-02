import { Button } from "@roprgm/ui/button";

export default function LabPrimary() {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      <div className="lab-prominent">
        <p className="mb-3 text-muted">A · prominent, as in production</p>
        <div className="flex gap-1.5">
          <Button>Cancel</Button>
          <Button variant="primary">Export</Button>
        </div>
      </div>
      <div>
        <p className="mb-3 text-muted">B · control on primary</p>
        <div className="flex gap-1.5">
          <Button>Cancel</Button>
          <Button variant="primary">Export</Button>
        </div>
      </div>
    </div>
  );
}
