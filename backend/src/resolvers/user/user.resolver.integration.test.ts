import {
  createAuthenticatedTestUser,
  createTestClient,
  createTestUser
} from '@/test/helpers';
import { describe, expect, it } from 'vitest';

describe('UserResolver (integration)', () => {
  it('deve criar um usuário via mutation USER_CREATE', async () => {
    const client = await createTestClient();

    const response = await client.post('/graphql').send({
      query: `
        mutation UserCreate($data: CreateUserInput!) {
          userCreate(data: $data) {
            user {
              id
            name
            email
            }
          }
        }
      `,
      variables: {
        data: { name: 'Ana', email: 'ana@test.com', password: '123456' }
      }
    });

    expect(response.status).toBe(200);
    expect(response.body.data.userCreate.user.email).toBe('ana@test.com');
    expect(response.body.data.userCreate.user.id).toBeDefined();
  });

  it('deve listar usuários via query USERS', async () => {
    const client = await createTestClient();

    const { accessToken } = await createAuthenticatedTestUser();

    const response = await client
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: `
        query Users {
          users {
            id
            name
            email
          }
        }
      `
      });

    expect(response.status).toBe(200);
    expect(response.body.data.users).toBeInstanceOf(Array);
    expect(response.body.data.users.length).toBeGreaterThan(0);
  });

  it('deve atualizar um usuário via mutation USER_UPDATE', async () => {
    const client = await createTestClient();

    const { accessToken } = await createAuthenticatedTestUser();

    const response = await client
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: `
          mutation UserUpdate($data: UpdateUserInput!) {
            userUpdate(data: $data) {
              id
              name
              email
            }
          }
        `,
        variables: {
          data: { name: 'Ana Updated', email: 'ana.updated@test.com' }
        }
      });

    expect(response.status).toBe(200);
    expect(response.body.data.userUpdate.name).toBe('Ana Updated');
    expect(response.body.data.userUpdate.email).toBe('ana.updated@test.com');
  });

  it('deve deletar um usuário via mutation USER_DELETE', async () => {
    const client = await createTestClient();

    const { accessToken } = await createAuthenticatedTestUser();

    const { user: anotherUser } = await createTestUser();

    const response = await client
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: `
          mutation UserDelete($id: String!) {
            userDelete(id: $id) {
              id
              name
              email
            }
          }
        `,
        variables: {
          id: anotherUser.id
        }
      });

    expect(response.status).toBe(200);
    expect(response.body.data.userDelete.id).toBe(anotherUser.id);
  });
});
