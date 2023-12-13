import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id: string | any = getRouterParam(event, "id");

  const result = await prisma.album.findUnique({
    where: {
      id: parseInt(id),
    },
    include: { songs: { orderBy: { id: "asc" } }, Artist: true },
  });

  return result;
});