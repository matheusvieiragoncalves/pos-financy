// src/resolvers/auth.resolver.test.ts
import { createTestClient } from '@/test/helpers';
import { describe, expect, it } from 'vitest';

describe('AuthResolver', () => {
  it('deve executar a mutation login', async () => {
    const client = await createTestClient();

    const response = await client.post('/graphql').send({
      query: `
        mutation Login($data: LoginInputDTO!) {
          login(data: $data)
        }
      `,
      variables: {
        data: { email: 'teste@teste.com', password: '123456' }
      }
    });

    expect(response.status).toBe(200);
    expect(response.body.data.login).toBe('Hello World');
  });
});
