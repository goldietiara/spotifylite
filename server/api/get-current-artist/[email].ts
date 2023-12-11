import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const email = getRouterParam(event, "email");

  const result = await prisma.artist.findUnique({
    where: {
      email: email as string,
    },
  });

  return result;
});
