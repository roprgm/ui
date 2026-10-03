import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@roprgm/ui/table";

const exports = [
  { name: "Golden hour.jpg", dimensions: "8192 × 5464", size: "14.2 MB" },
  { name: "Blue hour.jpg", dimensions: "6000 × 4000", size: "9.8 MB" },
  { name: "Fjord.png", dimensions: "4096 × 2731", size: "21.5 MB" },
];

export default function TableDemo() {
  return (
    <Table className="w-96">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Dimensions</TableHead>
          <TableHead className="text-right">Size</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {exports.map((file) => (
          <TableRow key={file.name}>
            <TableCell>{file.name}</TableCell>
            <TableCell className="text-secondary">{file.dimensions}</TableCell>
            <TableCell className="text-right">{file.size}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
