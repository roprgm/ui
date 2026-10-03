"use client";

import { Pagination } from "@roprgm/ui/pagination";
import { useState } from "react";

export default function PaginationLong() {
  const [page, setPage] = useState(7);
  return <Pagination page={page} count={20} onPageChange={setPage} />;
}
