import { IconButton } from "@roprgm/ui/icon-button";
import { CopyIcon, EyeIcon, MoreIcon } from "@/ui/icons";

export default function IconButtonDemo() {
  return (
    <div className="flex gap-1">
      <IconButton label="Hide layer">
        <EyeIcon />
      </IconButton>
      <IconButton label="Duplicate">
        <CopyIcon />
      </IconButton>
      <IconButton label="More">
        <MoreIcon />
      </IconButton>
    </div>
  );
}
