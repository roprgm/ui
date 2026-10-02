import { notFound } from "next/navigation";
import { pages } from "@/tree";
import { Doc } from "@/ui/doc";

const home = pages.find((page) => page.href === "/");

export default function Home() {
  if (!home) notFound();
  return <Doc page={home} />;
}
