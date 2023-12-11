import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const result = await prisma.user.findUnique({
    where: {
      //   id: id as any,
      id: parseInt(id as string),
    },
    include: {
      playlist: true,
      userProfile: {
        include: {
          likedSongs: { include: { Album: { include: { Artist: true } } } },
        },
      },
    },
  });

  return result;
});
