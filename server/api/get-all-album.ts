import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const result = await prisma.album.findMany({
    include: { Artist: true },
  });

  return result;
});
