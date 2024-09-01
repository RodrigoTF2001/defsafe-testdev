import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    // Busca todas as enquetes no banco de dados
    const polls = await prisma.adoption.findMany({

    });

    return polls;
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      message: 'Erro ao buscar os gatos',
    });
  } finally {
    await prisma.$disconnect();
  }
});
