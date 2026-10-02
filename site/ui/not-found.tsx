import { Link } from "react-router";

export function NotFound() {
  return (
    <div className="flex flex-col items-start gap-3 px-5 pt-7 md:px-12 md:pt-11">
      <h1 className="text-3xl font-semibold tracking-tight">Not found</h1>
      <p className="text-secondary">
        This page doesn't exist. Start from the{" "}
        <Link
          to="/"
          className="text-foreground underline decoration-muted underline-offset-4"
        >
          installation
        </Link>
        .
      </p>
    </div>
  );
}
