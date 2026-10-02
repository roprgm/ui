import { Button } from "@roprgm/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@roprgm/ui/dialog";
import { Section } from "@roprgm/ui/section";

export default function DialogAlert() {
  return (
    <Dialog alert>
      <DialogTrigger render={<Button />}>Delete layer…</DialogTrigger>
      <DialogContent>
        <Section className="gap-1">
          <DialogTitle>Delete “Sky”?</DialogTitle>
          <DialogDescription>
            Its mask and adjustments go with it.
          </DialogDescription>
        </Section>
        <Section className="flex-row justify-end gap-1.5 px-2.5">
          <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
          <DialogClose render={<Button className="text-danger" />}>
            Delete
          </DialogClose>
        </Section>
      </DialogContent>
    </Dialog>
  );
}
