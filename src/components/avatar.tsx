"use client";

import { Avatar as Primitive } from "@base-ui/react/avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import type { ComponentProps } from "react";

// Square as an icon button, so it sits in a row of them.
const avatar = cva(
  "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-control text-secondary select-none",
  {
    variants: {
      size: {
        default: "size-(--spacing-control)",
        sm: "size-(--spacing-control-sm)",
        lg: "size-(--spacing-control-lg)",
      },
    },
  },
);

/** A person's picture, with their initials or an icon until it loads or if it fails. */
export function Avatar({
  size = "default",
  className,
  ...props
}: Omit<ComponentProps<typeof Primitive.Root>, "className"> &
  VariantProps<typeof avatar> & { className?: string }) {
  return (
    <Primitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(avatar({ size }), className)}
      {...props}
    />
  );
}

export function AvatarImage({
  className,
  ...props
}: Omit<ComponentProps<typeof Primitive.Image>, "className"> & {
  className?: string;
}) {
  return (
    <Primitive.Image
      data-slot="avatar-image"
      className={cn("size-full object-cover", className)}
      {...props}
    />
  );
}

/** Trimmed to its capitals, so initials center by their ink, as a Badge's label does. */
export function AvatarFallback({
  className,
  ...props
}: Omit<ComponentProps<typeof Primitive.Fallback>, "className"> & {
  className?: string;
}) {
  return (
    <Primitive.Fallback
      data-slot="avatar-fallback"
      className={cn("[text-box:trim-both_cap_alphabetic]", className)}
      {...props}
    />
  );
}
