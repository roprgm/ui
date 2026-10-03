import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router";
import { head, type Meta } from "./head";

export { origin } from "./head";

import { routes } from "./routes";

const { query, dataRoutes } = createStaticHandler(routes);

/** A path's page as HTML, with its head, for the browser to hydrate. */
export async function render(path: string) {
  const context = await query(new Request(new URL(path, "http://localhost")));
  if (context instanceof Response) throw new Error(`${path} redirects`);
  const router = createStaticRouter(dataRoutes, context);
  const html = renderToString(
    <StrictMode>
      <StaticRouterProvider router={router} context={context} hydrate={false} />
    </StrictMode>,
  );
  return { html, head: head(context.matches.at(-1)?.route.handle as Meta) };
}

/** Every path with a page of its own. */
export const paths = (routes[0].children ?? []).flatMap(({ path }) =>
  path && path !== "*" ? [path] : [],
);
