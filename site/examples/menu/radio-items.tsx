"use client";

import { Button } from "@roprgm/ui/button";
import {
  Menu,
  MenuContent,
  MenuRadioGroup,
  MenuRadioItem,
  MenuTrigger,
} from "@roprgm/ui/menu";
import { useState } from "react";

export default function MenuRadioItems() {
  const [sort, setSort] = useState("date");
  return (
    <Menu>
      <MenuTrigger render={<Button />}>Sort</MenuTrigger>
      <MenuContent raised>
        <MenuRadioGroup value={sort} onValueChange={setSort}>
          <MenuRadioItem value="date">Date taken</MenuRadioItem>
          <MenuRadioItem value="name">Name</MenuRadioItem>
          <MenuRadioItem value="size">File size</MenuRadioItem>
        </MenuRadioGroup>
      </MenuContent>
    </Menu>
  );
}
