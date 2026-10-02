"use client";

import { Button } from "@roprgm/ui/button";
import { toast } from "@roprgm/ui/toast";

export default function ToastStates() {
  return (
    <div className="flex flex-wrap gap-1.5">
      <Button
        onClick={() =>
          toast.add({
            title: "Exported",
            description: "harbor.jpg is in Downloads.",
            type: "success",
          })
        }
      >
        Success
      </Button>
      <Button
        onClick={() =>
          toast.add({
            title: "Almost full",
            description: "2 GB left on the disk.",
            type: "warning",
          })
        }
      >
        Warning
      </Button>
      <Button
        onClick={() =>
          toast.add({
            title: "Export failed",
            description: "The disk is full.",
            priority: "high",
          })
        }
      >
        Alert
      </Button>
    </div>
  );
}
