import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);

  const result = await prisma.artist.update({
    where: { id: parseInt(id as string) },
    data: {
      name: body.name,
      image: body.image,
      imageName: body.imageName,
      header: body.header,
      headerName: body.headerName,
    },
  });

  return result;
});
