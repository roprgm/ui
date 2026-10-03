import { StrictMode, startTransition } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { routes } from "./routes";

const app = (
  <StrictMode>
    <RouterProvider router={createBrowserRouter(routes)} />
  </StrictMode>
);

// The build prerenders each page; the dev server doesn't.
const root = document.getElementById("root") as HTMLElement;
if (import.meta.env.DEV) createRoot(root).render(app);
else
  startTransition(() => {
    hydrateRoot(root, app);
  });
