import { Switch } from "@roprgm/ui/switch";

function Column({ title, className }: { title: string; className?: string }) {
  return (
    <div className={className}>
      <p className="mb-3 text-muted">{title}</p>
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2">
          <Switch defaultChecked /> Snap
        </label>
        <label className="flex items-center gap-2">
          <Switch /> Grid
        </label>
      </div>
    </div>
  );
}

export default function LabSwitch() {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      <Column
        title="A · prominent, as in production"
        className="lab-prominent"
      />
      <Column title="B · field on accent" />
      <Column title="C · control on accent" className="lab-control" />
    </div>
  );
}
