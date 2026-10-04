import { Avatar, AvatarFallback } from "@roprgm/ui/avatar";

const editors = [
  { name: "Mara Kim", initials: "MK" },
  { name: "Ali Lund", initials: "AL" },
  { name: "Jon Sato", initials: "JS" },
];

export default function AvatarInitials() {
  return (
    <ul className="flex flex-col gap-2">
      {editors.map((editor) => (
        <li key={editor.name} className="flex items-center gap-2.5">
          <Avatar>
            <AvatarFallback>{editor.initials}</AvatarFallback>
          </Avatar>
          {editor.name}
        </li>
      ))}
    </ul>
  );
}
