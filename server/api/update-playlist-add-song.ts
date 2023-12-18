import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const result = await prisma.song.update({
    where: { id: parseInt(body.songId as string) },
    data: {
      Playlist: { connect: { id: parseInt(body.playlistId) } },
    },
  });

  return result;
});
