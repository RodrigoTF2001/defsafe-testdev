import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const catId = body.id;
    const deletedCat = await prisma.cat.delete({
      where: { id: catId },
    });
    return deletedCat
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      message: 'Erro ao deletar a enquete',
    });
  } finally {
    await prisma.$disconnect();
  }
});
