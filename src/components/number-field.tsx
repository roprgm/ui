"use client";

import { NumberField as Primitive } from "@base-ui/react/number-field";
import { Chevron } from "./chevron";
import { Input, InputGroup, InputGroupAddon } from "./input";

const stepper =
  "flex w-full flex-1 items-center justify-center enabled:cursor-pointer enabled:hover:text-foreground disabled:text-disabled";

/**
 * A number to type, or to step with the arrow keys and the chevrons at its end. `format` writes it
 * with `Intl.NumberFormat`, such as a unit.
 */
export function NumberField({
  size = "default",
  "aria-label": label,
  "aria-invalid": invalid,
  "aria-describedby": describedBy,
  ...props
}: Primitive.Root.Props & { size?: "default" | "lg" }) {
  return (
    <Primitive.Root data-slot="number-field" render={<InputGroup />} {...props}>
      {/* A Field gives `id` to the root, which passes it on, and the rest to the input. */}
      <Primitive.Input
        data-slot="number-field-input"
        aria-label={label}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        render={<Input size={size} className="pr-7 tabular-nums" />}
      />
      <InputGroupAddon align="end" className="flex-col py-1">
        <Primitive.Increment
          data-slot="number-field-increment"
          className={stepper}
        >
          <Chevron direction="up" size="sm" />
        </Primitive.Increment>
        <Primitive.Decrement
          data-slot="number-field-decrement"
          className={stepper}
        >
          <Chevron size="sm" />
        </Primitive.Decrement>
      </InputGroupAddon>
    </Primitive.Root>
  );
}
