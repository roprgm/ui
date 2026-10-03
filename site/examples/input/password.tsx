"use client";

import { IconButton } from "@roprgm/ui/icon-button";
import { Input, InputGroup, InputGroupAddon } from "@roprgm/ui/input";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "@/ui/icons";

export default function InputPassword() {
  const [visible, setVisible] = useState(false);
  return (
    <InputGroup className="w-64">
      <Input
        type={visible ? "text" : "password"}
        defaultValue="lisbon-2024"
        aria-label="Password"
        className="pr-7"
      />
      <InputGroupAddon align="end">
        <IconButton
          label={visible ? "Hide password" : "Show password"}
          size="icon-sm"
          className="rounded-sm"
          onClick={() => setVisible(!visible)}
        >
          {visible ? <EyeOffIcon /> : <EyeIcon />}
        </IconButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
