"use client";

import { Button } from "@roprgm/ui/button";
import { toast } from "@roprgm/ui/toast";

export default function ToastWithAction() {
  return (
    <Button
      onClick={() =>
        toast.add({
          description: "Layer deleted.",
          actionProps: { children: "Undo" },
        })
      }
    >
      Delete layer
    </Button>
  );
}
