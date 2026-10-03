import { Avatar, AvatarFallback, AvatarImage } from "@roprgm/ui/avatar";

export default function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage src="https://picsum.photos/id/1027/128" alt="Mara Kim" />
      <AvatarFallback>MK</AvatarFallback>
    </Avatar>
  );
}
