import { UndoIcon } from "@/ui/icons";

export default function CustomControl() {
  return (
    <button
      type="button"
      className="flex h-(--spacing-control) items-center gap-1.5 rounded-md px-3 pl-2 surface-control transition hover:bg-control-hover focus-ring dim-disabled"
    >
      <UndoIcon />
      Rotate left
    </button>
  );
}
