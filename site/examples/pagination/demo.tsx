"use client";

import { Pagination } from "@roprgm/ui/pagination";
import { useState } from "react";

export default function PaginationDemo() {
  const [page, setPage] = useState(1);
  return <Pagination page={page} count={5} onPageChange={setPage} />;
}
