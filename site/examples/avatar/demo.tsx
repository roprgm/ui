import { Avatar, AvatarFallback, AvatarImage } from "@roprgm/ui/avatar";

export default function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/roprgm.png" alt="Rodrigo" />
      <AvatarFallback>RP</AvatarFallback>
    </Avatar>
  );
}
