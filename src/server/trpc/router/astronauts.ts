import { t } from "../trpc";
import { z } from "zod";

export const astronautsRouter = t.router({
  createOne: t.procedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        birthDate: z.date(),
        superpower: z.string(),
      })
    )
    .mutation(
      ({ ctx, input: { firstName, lastName, birthDate, superpower } }) => {
        return ctx.prisma.astronaut.create({
          data: { firstName, lastName, birthDate, superpower },
        });
      }
    ),
  update: t.procedure
    .input(
      z.object({
        id: z.number().int(),
        firstName: z.string().max(64).optional(),
        lastName: z.string().max(64).optional(),
        birthDate: z.date().optional(),
        superpower: z.string().max(128).optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.astronaut.update({
        where: { id: input.id },
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          birthDate: input.birthDate,
          superpower: input.superpower,
        },
      });
    }),

  delete: t.procedure
    .input(z.object({ id: z.number().int() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.astronaut.delete({ where: { id: input.id } });
    }),
  count: t.procedure.query(({ ctx }) => {
    return ctx.prisma.astronaut.count();
  }),
  getAll: t.procedure
    .input(
      z.object({
        sort: z
          .string()
          .regex(/\w+:(desc|asc)$/, {
            message: "Invalid sort format: `fieldName:asc|desc`",
          })
          .transform((val) => val.split(":"))
          .optional(),
        start: z.number().int().nonnegative().optional(),
        limit: z.number().int().nonnegative().optional(),
      })
    )
    .query(({ ctx, input }) => {
      const sortInput = input?.sort as [string, string] | undefined;
      const [col, order] = sortInput ?? ["id", "asc"]; // Default sort

      return ctx.prisma.astronaut.findMany({
        orderBy: { [col]: order },
        skip: input.start ?? 0,
        take: input.limit ?? undefined,
      });
    }),
});
