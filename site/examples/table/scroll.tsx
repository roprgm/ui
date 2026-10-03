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
    file: "IMG_0412.CR3",
    lens: "RF 24–70mm",
    exposure: "ƒ/2.8 · 1/250 s",
    iso: 100,
  },
  {
    file: "IMG_0413.CR3",
    lens: "RF 85mm",
    exposure: "ƒ/1.2 · 1/1000 s",
    iso: 200,
  },
  {
    file: "IMG_0418.CR3",
    lens: "RF 15–35mm",
    exposure: "ƒ/8 · 1/60 s",
    iso: 800,
  },
];

export default function TableScroll() {
  return (
    <Table className="w-72">
      <TableHeader>
        <TableRow>
          <TableHead>File</TableHead>
          <TableHead>Lens</TableHead>
          <TableHead>Exposure</TableHead>
          <TableHead className="text-right">ISO</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {photos.map((photo) => (
          <TableRow key={photo.file}>
            <TableCell>{photo.file}</TableCell>
            <TableCell className="text-secondary">{photo.lens}</TableCell>
            <TableCell className="text-secondary">{photo.exposure}</TableCell>
            <TableCell className="text-right">{photo.iso}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
