import { Button } from "@roprgm/ui/button";
import { Link } from "react-router";

export default function ButtonAsLink() {
  return (
    <Button variant="ghost" render={<Link to="/components/icon-button" />}>
      Icon button
    </Button>
  );
}
