import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id: string | any = getRouterParam(event, "id");

  const result = await prisma.artist.findUnique({
    where: {
      id: parseInt(id),
    },
    include: { album: true },
  });

  return result;
});
