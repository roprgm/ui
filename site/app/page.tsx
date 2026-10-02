import { pages } from "@/tree";
import { Doc } from "@/ui/doc";

const home = pages.find((page) => page.href === "/");

export default function Home() {
  return home && <Doc page={home} />;
}
