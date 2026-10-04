import { Card } from "@roprgm/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@roprgm/ui/table";

const photos = [
  {
    name: "Golden hour.jpg",
    camera: "Canon EOS R5",
    taken: "Jun 12",
    size: "14.2 MB",
  },
  {
    name: "Blue hour.jpg",
    camera: "Canon EOS R5",
    taken: "Jun 12",
    size: "9.8 MB",
  },
  {
    name: "Fjord.png",
    camera: "Fujifilm X-T5",
    taken: "Jul 3",
    size: "21.5 MB",
  },
  { name: "Harbor.jpg", camera: "Leica Q3", taken: "Jul 9", size: "11.7 MB" },
  { name: "Dunes.jpg", camera: "Sony A7 IV", taken: "Aug 21", size: "8.4 MB" },
];

export default function TableDemo() {
  return (
    <Card className="w-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Camera</TableHead>
            <TableHead>Taken</TableHead>
            <TableHead className="text-right">Size</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {photos.map((photo) => (
            <TableRow key={photo.name}>
              <TableCell>{photo.name}</TableCell>
              <TableCell className="text-secondary">{photo.camera}</TableCell>
              <TableCell className="text-secondary">{photo.taken}</TableCell>
              <TableCell className="text-right">{photo.size}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
