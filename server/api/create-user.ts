import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const result = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      dateOfBirth: body.dateOfBirth,
      image: body.image,
      location: body.location,
      onBoarding: body.onBoarding,
      isArtist: body.isArtist,
    },
  });

  return result;
});
