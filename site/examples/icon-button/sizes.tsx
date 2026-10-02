import { IconButton } from "@roprgm/ui/icon-button";
import { MoreIcon } from "@/ui/icons";

export default function IconButtonSizes() {
  return (
    <>
      <IconButton label="More" size="icon-sm">
        <MoreIcon />
      </IconButton>
      <IconButton label="More">
        <MoreIcon />
      </IconButton>
      <IconButton label="More" size="icon-lg">
        <MoreIcon />
      </IconButton>
    </>
  );
}
