"use client";

import { Button } from "@roprgm/ui/button";
import { toast } from "@roprgm/ui/toast";

export default function ToastAlert() {
  return (
    <Button
      onClick={() =>
        toast.add({
          title: "Export failed",
          description: "The disk is full.",
          priority: "high",
        })
      }
    >
      Export
    </Button>
  );
}
