import { Avatar, AvatarFallback, AvatarImage } from "@roprgm/ui/avatar";
import { Button } from "@roprgm/ui/button";

export default function AvatarSizes() {
  return (
    <div className="flex flex-col gap-2">
      <span className="flex items-center gap-2">
        <Avatar size="sm">
          <AvatarImage src="https://github.com/roprgm.png" alt="Rodrigo" />
          <AvatarFallback>RP</AvatarFallback>
        </Avatar>
        <Button size="sm">Follow</Button>
      </span>
      <span className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/roprgm.png" alt="Rodrigo" />
          <AvatarFallback>RP</AvatarFallback>
        </Avatar>
        <Button>Follow</Button>
      </span>
      <span className="flex items-center gap-2">
        <Avatar size="lg">
          <AvatarImage src="https://github.com/roprgm.png" alt="Rodrigo" />
          <AvatarFallback>RP</AvatarFallback>
        </Avatar>
        <Button size="lg">Follow</Button>
      </span>
    </div>
  );
}
