"use client";

import { Card } from "@roprgm/ui/card";
import { Checkbox } from "@roprgm/ui/checkbox";
import { DragToggle } from "@roprgm/ui/drag-toggle";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@roprgm/ui/table";
import { useState } from "react";

const members = [
  { name: "Ana Ruiz", email: "ana@studio.com", role: "Owner" },
  { name: "Leo Park", email: "leo@studio.com", role: "Editor" },
  { name: "Mia Chen", email: "mia@studio.com", role: "Editor" },
  { name: "Sam Okafor", email: "sam@studio.com", role: "Viewer" },
  { name: "Ines Costa", email: "ines@studio.com", role: "Viewer" },
  { name: "Theo Lind", email: "theo@studio.com", role: "Viewer" },
];

export default function TableSelect() {
  const [selected, setSelected] = useState(["leo@studio.com"]);
  const toggle = (email: string) =>
    setSelected((current) =>
      current.includes(email)
        ? current.filter((other) => other !== email)
        : [...current, email],
    );
  return (
    <DragToggle className="min-w-0">
      <Card className="w-lg max-w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-0 pr-0" />
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => {
              const isSelected = selected.includes(member.email);
              // Secondary text doesn't read on a selected row's fill.
              const detail = isSelected ? undefined : "text-secondary";
              return (
                <TableRow
                  key={member.email}
                  data-selected={isSelected}
                  onClick={() => toggle(member.email)}
                >
                  <TableCell className="pr-0">
                    <Checkbox
                      name="members"
                      className="grid"
                      aria-label={`Select ${member.name}`}
                      checked={isSelected}
                      readOnly
                    />
                  </TableCell>
                  <TableCell>{member.name}</TableCell>
                  <TableCell className={detail}>{member.email}</TableCell>
                  <TableCell className={detail}>{member.role}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </DragToggle>
  );
}
