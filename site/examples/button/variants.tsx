import { Button } from "@roprgm/ui/button";

export default function ButtonVariants() {
  return (
    <>
      <Button>Default</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="flat">Flat</Button>
      <Button variant="ghost">Ghost</Button>
      <Button disabled>Disabled</Button>
    </>
  );
}
