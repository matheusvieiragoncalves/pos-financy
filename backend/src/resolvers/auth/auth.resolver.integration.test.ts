import { createTestClient } from '@/test/helpers';
import { describe, expect, it } from 'vitest';

describe('AuthResolver (integration)', () => {
  it('deve executar a mutation login via GraphQL', async () => {
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

  it('deve lançar UnauthorizedError se as credenciais forem inválidas', async () => {
    const client = await createTestClient();

    const response = await client.post('/graphql').send({
      query: `
        mutation Login($data: LoginInputDTO!) {
          login(data: $data)
        }
      `,
      variables: {
        data: { email: '', password: '' }
      }
    });

    expect(response.status).toBe(401);
    expect(response.body.errors[0].message).toBe('Credenciais inválidas');
  });
});
