import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const result = await prisma.album.update({
    where: { id: parseInt(body.albumId as string) },
    data: {
      likes: { disconnect: { id: body.userProfileId } },
    },
  });

  return result;
});
