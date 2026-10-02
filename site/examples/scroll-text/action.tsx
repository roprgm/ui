import { IconButton } from "@roprgm/ui/icon-button";
import { ScrollText } from "@roprgm/ui/scroll-text";
import { EyeIcon } from "@/ui/icons";

export default function ScrollTextWithAction() {
  return (
    <div className="flex w-56 items-center gap-1 rounded-md material-field pl-2.5">
      <ScrollText className="flex-1">
        Subject mask from the brush, feathered
      </ScrollText>
      <IconButton label="Hide mask">
        <EyeIcon />
      </IconButton>
    </div>
  );
}
