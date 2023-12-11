import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const result = await prisma.album.create({
    data: {
      name: body.name,
      image: body.image,
      imageName: body.imageName,
      genre: body.genre,
      Artist: {
        connect: {
          id: body.Artist,
        },
      },
    },
  });

  return result;
});
