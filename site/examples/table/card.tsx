"use client";

import { Card } from "@roprgm/ui/card";
import { Checkbox } from "@roprgm/ui/checkbox";
import { IconButton } from "@roprgm/ui/icon-button";
import { Section, SectionAction } from "@roprgm/ui/section";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@roprgm/ui/table";
import { useState } from "react";
import { PlusIcon } from "@/ui/icons";

const members = [
  { name: "Ana Ruiz", email: "ana@studio.com", role: "Owner" },
  { name: "Leo Park", email: "leo@studio.com", role: "Editor" },
  { name: "Mia Chen", email: "mia@studio.com", role: "Viewer" },
];

export default function TableCard() {
  const [selected, setSelected] = useState(["leo@studio.com"]);
  const toggle = (email: string) =>
    setSelected(
      selected.includes(email)
        ? selected.filter((other) => other !== email)
        : [...selected, email],
    );
  return (
    <Card className="w-md">
      <Section className="flex-row items-center">
        <h2 className="flex-1 font-medium">Members</h2>
        <SectionAction>
          <IconButton label="Invite">
            <PlusIcon />
          </IconButton>
        </SectionAction>
      </Section>
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
  );
}
