import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@roprgm/ui/breadcrumb";

const folders = ["Library", "2026", "Lisbon", "Alfama", "Rooftops"];

export default function BreadcrumbOverflow() {
  return (
    <Breadcrumb className="w-64">
      {folders.map((folder) => (
        <BreadcrumbItem key={folder}>
          <BreadcrumbLink href={`#${folder}`}>{folder}</BreadcrumbLink>
        </BreadcrumbItem>
      ))}
      <BreadcrumbItem aria-current="page">Golden hour.jpg</BreadcrumbItem>
    </Breadcrumb>
  );
}
