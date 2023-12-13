import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const result = await prisma.user.update({
    where: { id: parseInt(body.id) },
    data: {
      playlist: { connect: { id: parseInt(body.playlist) } },
    },
  });
  return result;
});
