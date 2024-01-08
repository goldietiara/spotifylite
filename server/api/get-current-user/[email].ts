import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const email = getRouterParam(event, "email");

  const result = await prisma.user.findUnique({
    where: {
      email: email as string,
    },
    include: {
      playlist: { orderBy: { id: "desc" } },
      userProfile: {
        include: {
          likedSongs: { include: { Album: { include: { Artist: true } } } },
        },
      },
    },
  });

  return result;
});
