import { createTestClient } from '@/test/helpers';
import { describe, expect, it } from 'vitest';

describe('UserResolver (integration)', () => {
  it('deve criar um usuário via mutation userCreate', async () => {
    const client = await createTestClient();

    const response = await client.post('/graphql').send({
      query: `
        mutation UserCreate($data: CreateUserInput!) {
          userCreate(data: $data) {
            id
            name
            email
          }
        }
      `,
      variables: {
        data: { name: 'Ana', email: 'ana@test.com', password: '123456' }
      }
    });

    expect(response.status).toBe(200);
    expect(response.body.data.userCreate.email).toBe('ana@test.com');
    expect(response.body.data.userCreate.id).toBeDefined();
  });
});
