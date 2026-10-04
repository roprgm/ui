import { Card } from "@roprgm/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@roprgm/ui/table";

const albums = ["Lisbon", "Fjords", "Dunes", "Harbor", "Night"];

const photos = Array.from({ length: 40 }, (_, index) => ({
  file: `IMG_${String(4120 + index).padStart(4, "0")}.CR3`,
  album: albums[index % albums.length],
  taken: `Jun ${(index % 28) + 1}, 2026`,
  size: `${(8 + ((index * 7) % 15) + (index % 10) / 10).toFixed(1)} MB`,
}));

export default function TableLong() {
  return (
    <Card className="w-lg">
      <Table className="max-h-80">
        <TableHeader>
          <TableRow>
            <TableHead>File</TableHead>
            <TableHead>Album</TableHead>
            <TableHead>Taken</TableHead>
            <TableHead className="text-right">Size</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {photos.map((photo) => (
            <TableRow key={photo.file}>
              <TableCell>{photo.file}</TableCell>
              <TableCell className="text-secondary">{photo.album}</TableCell>
              <TableCell className="text-secondary">{photo.taken}</TableCell>
              <TableCell className="text-right">{photo.size}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
