import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result =
    await prisma.$executeRaw`UPDATE userProfile SET songs = ARRAY_REMOVE(songs, ${body.songId}) WHERE id = ${body.userProfileId}`;
  // await prisma.$executeRaw`UPDATE userProfile SET songs = array_remove(songs, ${body.songId}) WHERE id = ${body.userProfileId}`;

  return result;
});
