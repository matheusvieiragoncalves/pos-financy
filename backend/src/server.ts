// src/index.ts
import 'dotenv/config';
import 'reflect-metadata';

import { createApp } from '@/app';

async function startServer() {
  const app = await createApp();
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
}

startServer();
