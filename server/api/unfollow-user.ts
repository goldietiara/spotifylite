import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  await prisma.$transaction(async (tx) => {
    const result = await tx.user.update({
      where: { id: parseInt(body.userId) },
      data: {
        followers: { disconnect: { id: parseInt(body.currentUserId) } },
      },
    });

    await tx.user.update({
      where: { id: parseInt(body.currentUserId) },
      data: {
        following: { disconnect: { id: parseInt(body.userId) } },
      },
    });
  });
});
