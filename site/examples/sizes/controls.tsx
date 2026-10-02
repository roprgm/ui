import { Button } from "@roprgm/ui/button";
import { IconButton } from "@roprgm/ui/icon-button";
import { Input } from "@roprgm/ui/input";
import { ListItem } from "@roprgm/ui/list-item";
import { Select } from "@roprgm/ui/select";
import { MoreIcon } from "@/ui/icons";

const formats = [
  { value: "jpeg", label: "JPEG" },
  { value: "png", label: "PNG" },
];

export default function SizesControls() {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-6 gap-y-4">
      <span className="text-secondary tabular-nums">24px</span>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm">Small</Button>
        <IconButton label="More" size="icon-sm">
          <MoreIcon />
        </IconButton>
      </div>
      <span className="text-secondary tabular-nums">28px</span>
      <div className="flex flex-wrap items-center gap-2">
        <Button>Default</Button>
        <IconButton label="More">
          <MoreIcon />
        </IconButton>
        <Input placeholder="Name" className="w-32" />
        <Select
          raised
          aria-label="Format"
          items={formats}
          placeholder="Format"
          className="w-28"
        />
      </div>
      <span className="text-secondary tabular-nums">32px</span>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="lg">Large</Button>
        <IconButton label="More" size="icon-lg">
          <MoreIcon />
        </IconButton>
        <Input size="lg" placeholder="Name" className="w-32" />
        <Select
          raised
          size="lg"
          aria-label="Format"
          items={formats}
          placeholder="Format"
          className="w-28"
        />
      </div>
      <span className="text-secondary tabular-nums">40px</span>
      <div className="w-64 max-w-full overflow-hidden rounded-lg material-float">
        <ListItem>Sky</ListItem>
        <ListItem>Subject</ListItem>
      </div>
    </div>
  );
}
