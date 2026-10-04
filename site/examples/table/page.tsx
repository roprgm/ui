import { Kbd } from "@roprgm/ui/kbd";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@roprgm/ui/table";

const shortcuts = [
  { action: "Crop", keys: ["C"] },
  { action: "Compare with the original", keys: ["\\"] },
  { action: "Copy edits", keys: ["⌘", "C"] },
  { action: "Paste edits", keys: ["⌘", "V"] },
  { action: "Export", keys: ["⌘", "E"] },
];

export default function TablePage() {
  return (
    <article className="flex max-w-xl flex-col gap-3 p-8">
      <h2 className="font-medium">Keyboard shortcuts</h2>
      <p className="text-secondary">
        Every edit has a key, so you can work through a shoot without leaving
        the photo.
      </p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Action</TableHead>
            <TableHead className="text-right">Keys</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shortcuts.map((shortcut) => (
            <TableRow key={shortcut.action}>
              <TableCell>{shortcut.action}</TableCell>
              <TableCell className="text-right">
                <span className="inline-flex gap-1">
                  {shortcut.keys.map((key) => (
                    <Kbd key={key}>{key}</Kbd>
                  ))}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </article>
  );
}
