import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id: string | any = getRouterParam(event, "id");

  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      userProfile: {
        include: {
          likedSongs: {
            include: { Album: { include: { Artist: true } } },
          },
          likedPlaylist: true,
        },
      },
      playlist: { orderBy: { id: "desc" } },
      followers: { orderBy: { id: "desc" } },
      following: { orderBy: { id: "desc" } },
      _count: { select: { followers: true, following: true, playlist: true } },
    },
  });

  return user;
});
