import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event: any) => {
  let albums = await prisma.album.findMany({
    orderBy: { id: "desc" },
    include: { songs: true },
  });
  return albums;
});
