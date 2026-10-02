"use client";

import { Chip } from "@roprgm/ui/chip";
import { useState } from "react";

export default function ChipDemo() {
  const [overlay, setOverlay] = useState(true);
  const [erase, setErase] = useState(false);
  return (
    <div className="flex items-center gap-1 rounded-full bg-field/60 p-1">
      <Chip aria-pressed={overlay} onClick={() => setOverlay(!overlay)}>
        Overlay
      </Chip>
      <Chip aria-pressed={erase} onClick={() => setErase(!erase)}>
        Erase
      </Chip>
      <Chip>Reset</Chip>
    </div>
  );
}
