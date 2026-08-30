import { execSync } from 'node:child_process';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { prismaClient } from '../../prisma/prisma';

beforeAll(() => {
  // Aplica as migrations no banco de teste antes de rodar a suíte
  execSync('npx prisma migrate deploy', {
    env: { ...process.env, DATABASE_URL: 'file:./test.db' }
  });
});

afterEach(async () => {
  // Limpa as tabelas entre cada teste, mantendo isolamento
  await prismaClient.transaction.deleteMany();
  await prismaClient.category.deleteMany();
  await prismaClient.user.deleteMany();
});

// obs.: deleteMany funciona bem para poucas tabelas. Se o schema crescer bastante, vale usar prisma migrate reset --force ou truncar via $executeRawUnsafe percorrendo as tabelas dinamicamente — mas isso é otimização para depois.

afterAll(async () => {
  await prismaClient.$disconnect();
});
