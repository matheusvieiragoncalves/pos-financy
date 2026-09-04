import { CategoryColorEnum, CategoryIconEnum } from '@/enums';
import {
  createAuthenticatedTestUser,
  createTestCategory,
  createTestClient
} from '@/test/helpers';
import { describe, expect, it } from 'vitest';

describe('CategoryResolver (integration)', () => {
  it('deve criar uma categoria via mutation CATEGORY_CREATE', async () => {
    const { accessToken } = await createAuthenticatedTestUser();
    const client = await createTestClient();

    const response = await client
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: `
        mutation CategoryCreate($data: CreateCategoryInput!){
          categoryCreate(data: $data){
            id
            title
            description
            color
            icon
          }
        }
      `,
        variables: {
          data: {
            title: 'Comprinhas de casa',
            description: 'Descrição da categoria Ana',
            color: CategoryColorEnum.GREEN,
            icon: CategoryIconEnum.HOUSE
          }
        }
      });

    expect(response.status).toBe(200);
    expect(response.body.data.categoryCreate.id).toBeDefined();
    expect(response.body.data.categoryCreate.title).toBe('Comprinhas de casa');
  });

  it('deve listar categorias via query CATEGORIES', async () => {
    const client = await createTestClient();

    const { accessToken, user } = await createAuthenticatedTestUser();

    await createTestCategory(user.id);

    const response = await client
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: `
        query Categories {
          categories {
            id
            title
            description
            color
            icon
            hexColor
          }
        }
      `
      });

    expect(response.status).toBe(200);
    expect(response.body.data.categories).toBeInstanceOf(Array);
    expect(response.body.data.categories.length).toBeGreaterThan(0);
  });

  it('deve atualizar uma categoria via mutation CATEGORY_UPDATE', async () => {
    const client = await createTestClient();

    const { accessToken, user } = await createAuthenticatedTestUser();
    const { category } = await createTestCategory(user.id);

    const response = await client
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: `
          mutation UpdateCategory($id: String!, $data:UpdateCategoryInput!){
            categoryUpdate(id: $id, data: $data){
              id
              title
              description
              color
              icon
            }
          }
        `,
        variables: {
          id: category.id,
          data: {
            title: 'Updated category',
            description: 'Updated description'
          }
        }
      });

    expect(response.status).toBe(200);
    expect(response.body.data.categoryUpdate.title).toBe('Updated category');
  });

  it('deve deletar uma categoria via mutation CATEGORY_DELETE', async () => {
    const client = await createTestClient();

    const { accessToken, user } = await createAuthenticatedTestUser();

    const { category } = await createTestCategory(user.id);

    const response = await client
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: `
          mutation CategoryDelete($id: String!) {
            categoryDelete(id: $id) {
              id
              title
              description
              color
              icon
            }
          }
        `,
        variables: {
          id: category.id
        }
      });

    expect(response.status).toBe(200);
    expect(response.body.data.categoryDelete.id).toBe(category.id);
  });
});
