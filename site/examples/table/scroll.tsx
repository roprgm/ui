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
    file: "IMG_0412.CR3",
    camera: "Canon EOS R5",
    lens: "RF 24–70mm",
    focal: "35 mm",
    aperture: "ƒ/2.8",
    shutter: "1/250 s",
    iso: 100,
  },
  {
    file: "IMG_0413.CR3",
    camera: "Canon EOS R5",
    lens: "RF 85mm",
    focal: "85 mm",
    aperture: "ƒ/1.2",
    shutter: "1/1000 s",
    iso: 200,
  },
  {
    file: "IMG_0418.CR3",
    camera: "Canon EOS R5",
    lens: "RF 15–35mm",
    focal: "15 mm",
    aperture: "ƒ/8",
    shutter: "1/60 s",
    iso: 800,
  },
  {
    file: "DSCF2203.RAF",
    camera: "Fujifilm X-T5",
    lens: "XF 23mm",
    focal: "23 mm",
    aperture: "ƒ/2",
    shutter: "1/500 s",
    iso: 160,
  },
  {
    file: "DSCF2207.RAF",
    camera: "Fujifilm X-T5",
    lens: "XF 56mm",
    focal: "56 mm",
    aperture: "ƒ/1.4",
    shutter: "1/2000 s",
    iso: 125,
  },
];

export default function TableScroll() {
  return (
    <Card className="w-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>File</TableHead>
            <TableHead>Camera</TableHead>
            <TableHead>Lens</TableHead>
            <TableHead className="text-right">Focal length</TableHead>
            <TableHead className="text-right">Aperture</TableHead>
            <TableHead className="text-right">Shutter</TableHead>
            <TableHead className="text-right">ISO</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {photos.map((photo) => (
            <TableRow key={photo.file}>
              <TableCell>{photo.file}</TableCell>
              <TableCell className="text-secondary">{photo.camera}</TableCell>
              <TableCell className="text-secondary">{photo.lens}</TableCell>
              <TableCell className="text-right">{photo.focal}</TableCell>
              <TableCell className="text-right">{photo.aperture}</TableCell>
              <TableCell className="text-right">{photo.shutter}</TableCell>
              <TableCell className="text-right">{photo.iso}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
