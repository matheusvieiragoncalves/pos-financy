import { createTestClient } from '@/test/helpers';
import { describe, expect, it } from 'vitest';

describe('UserResolver (integration)', () => {
  it('deve responder a query helloWorld via GraphQL', async () => {
    const client = await createTestClient();

    const response = await client.post('/graphql').send({
      query: `query { helloWorld }`
    });

    expect(response.status).toBe(200);
    expect(response.body.data.helloWorld).toBe('Hello World');
  });
});
