import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@roprgm/ui/breadcrumb";
import { Link } from "react-router";

export default function BreadcrumbDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink render={<Link to="/" />}>Docs</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink render={<Link to="/components" />}>
          Components
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem aria-current="page">Breadcrumb</BreadcrumbItem>
    </Breadcrumb>
  );
}
