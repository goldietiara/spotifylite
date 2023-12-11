import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const result = await prisma.song.create({
    data: {
      name: body.name,
      artistId: body.artistId,
      Album: {
        connect: {
          id: body.Album,
        },
      },
    },
  });

  return result;
});
