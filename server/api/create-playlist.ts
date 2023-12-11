import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const result = await prisma.playlist.create({
    data: {
      userId: body.userId,
      name: body.name,
      description: body.description,
      image: body.image,
      imageName: body.imageName,
    },
  });

  return result;
});
