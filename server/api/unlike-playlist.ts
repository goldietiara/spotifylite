import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const result = await prisma.playlist.update({
    where: { id: parseInt(body.playlistId as string) },
    data: {
      userProfile: { disconnect: { id: body.userProfileId } },
    },
  });

  return result;
});
