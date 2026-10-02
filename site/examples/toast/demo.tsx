"use client";

import { Button } from "@roprgm/ui/button";
import { toast } from "@roprgm/ui/toast";

export default function ToastDemo() {
  return (
    <Button
      onClick={() =>
        toast.add({ title: "Exported", description: "portrait-edit.jpg" })
      }
    >
      Export
    </Button>
  );
}
