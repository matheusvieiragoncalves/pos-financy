import { TransactionTypeEnum } from '@/enums';
import {
  createAuthenticatedTestUser,
  createTestCategory,
  createTestClient,
  createTestTransaction,
  createTestUser
} from '@/test/helpers';
import { describe, expect, it } from 'vitest';

describe('TransactionResolver (integration)', () => {
  it('deve listar transações de um usuário via query TRANSACTIONS', async () => {
    const client = await createTestClient();

    const { accessToken, user } = await createAuthenticatedTestUser();
    await createTestTransaction(user.id);

    const response = await client
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: `
          query {
            transactions {
              id
              amount
              date
              description
              category {
                id
                title
              }
              user {
                id
                name
              }
            }
          }
      `
      });

    expect(response.status).toBe(200);
    expect(response.body.data.transactions).toBeInstanceOf(Array);
    expect(response.body.data.transactions.length).toBeGreaterThan(0);
  });

  it('deve criar uma transação via mutation TRANSACTION_CREATE', async () => {
    const client = await createTestClient();

    const { accessToken, user } = await createAuthenticatedTestUser();
    const { category } = await createTestCategory(user.id);

    const response = await client
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: `
        mutation TransactionCreate($data: CreateTransactionInput!){
          transactionCreate(data: $data){
            id
            amount
            date
            description
            category {
              id
              title
            }
            user {
              id
              name
            }
          }
        }
      `,
        variables: {
          data: {
            amount: 100,
            date: new Date().toISOString(),
            description: 'Descrição da transação',
            categoryId: category.id,
            type: TransactionTypeEnum.IN
          }
        }
      });

    expect(response.status).toBe(200);
    expect(response.body.data.transactionCreate.id).toBeDefined();
    expect(response.body.data.transactionCreate.amount).toBe(100);
  });

  it('deve atualizar uma transação via mutation TRANSACTION_UPDATE', async () => {
    const client = await createTestClient();

    const { accessToken, user } = await createAuthenticatedTestUser();

    const { transaction } = await createTestTransaction(user.id);

    const response = await client
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: `
          mutation UpdateTransaction($id: String!, $data:UpdateTransactionInput!){
            transactionUpdate(id: $id, data: $data){
              id
              amount
              date
              description
              category {
                id
                title
              }
              user {
                id
                name
              }
            }
          }
        `,
        variables: {
          id: transaction.id,
          data: {
            amount: 200,
            description: 'Updated description'
          }
        }
      });

    expect(response.status).toBe(200);
    expect(response.body.data.transactionUpdate.amount).toBe(200);
    expect(response.body.data.transactionUpdate.description).toBe(
      'Updated description'
    );
  });

  it('não deve atualizar uma transação de outro usuário via mutation TRANSACTION_UPDATE', async () => {
    const client = await createTestClient();

    const { accessToken } = await createAuthenticatedTestUser();

    const { user: otherUser } = await createTestUser();

    const { transaction } = await createTestTransaction(otherUser.id);

    const response = await client
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: `
          mutation UpdateTransaction($id: String!, $data:UpdateTransactionInput!){
            transactionUpdate(id: $id, data: $data){
              id
              amount
              date
              description
              category {
                id
                title
              }
              user {
                id
                name
              }
            }
          }
        `,
        variables: {
          id: transaction.id,
          data: {
            amount: 200,
            description: 'Updated description'
          }
        }
      });

    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toBe(
      'You are not authorized to update this transaction'
    );
  });

  it('deve deletar uma transação via mutation TRANSACTION_DELETE', async () => {
    const client = await createTestClient();

    const { accessToken, user } = await createAuthenticatedTestUser();
    const { transaction } = await createTestTransaction(user.id);

    const response = await client
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: `
            mutation TransactionDelete($id: String!) {
              transactionDelete(id: $id) {
                id
                amount
                date
                description
                category {
                  id
                  title
                }
                user {
                  id
                  name
                }
              }
            }
          `,
        variables: {
          id: transaction.id
        }
      });

    expect(response.status).toBe(200);
    expect(response.body.data.transactionDelete.id).toBe(transaction.id);
  });
});
