import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id: string | any = getRouterParam(event, "id");

  const result = await prisma.playlist.findUnique({
    where: {
      id: parseInt(id),
    },
    include: { songs: { include: { Album: { include: { Artist: true } } } } },
  });
  return result;
});
