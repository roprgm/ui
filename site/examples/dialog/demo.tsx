import { Button } from "@roprgm/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@roprgm/ui/dialog";
import { Input } from "@roprgm/ui/input";
import { Section } from "@roprgm/ui/section";

export default function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>Export…</DialogTrigger>
      <DialogContent>
        <Section className="gap-1">
          <DialogTitle>Export image</DialogTitle>
          <DialogDescription>
            Saves a copy with your edits. The original stays as it is.
          </DialogDescription>
        </Section>
        <Section>
          <Input defaultValue="portrait-edit.jpg" aria-label="File name" />
        </Section>
        <Section className="flex-row justify-end gap-1.5 px-2.5">
          <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
          <DialogClose render={<Button />}>Export</DialogClose>
        </Section>
      </DialogContent>
    </Dialog>
  );
}
