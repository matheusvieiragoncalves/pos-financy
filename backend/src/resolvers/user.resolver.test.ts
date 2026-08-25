// src/resolvers/user.resolver.test.ts
import { createTestClient } from '@/test/helpers';
import { describe, expect, it } from 'vitest';

describe('UserResolver', () => {
  it('deve responder a query helloWorld', async () => {
    const client = await createTestClient();

    const response = await client.post('/graphql').send({
      query: `
        query {
          helloWorld
        }
      `
    });

    expect(response.status).toBe(200);
    expect(response.body.data.helloWorld).toBe('Hello World');
  });
});
