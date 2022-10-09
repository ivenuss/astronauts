// src/server/router/index.ts
import { t } from "../trpc";

import { astronautsRouter } from "./astronauts";

export const appRouter = t.router({
  astronauts: astronautsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
