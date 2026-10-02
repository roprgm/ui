import { Button } from "@roprgm/ui/button";

export default function ButtonAsLink() {
  return (
    <Button variant="ghost" render={<a href="/components/icon-button" />}>
      Icon button
    </Button>
  );
}
