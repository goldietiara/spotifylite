import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);

  const result = await prisma.playlist.update({
    where: { id: parseInt(id as string) },
    data: {
      name: body.name,
      description: body.description,
      image: body.image,
      imageName: body.imageName,
    },
  });

  return result;
});
