import { UserService } from '@/services/user/user.service';
import { createTestClient } from '@/test/helpers';
import { afterEach, describe, expect, it, vi } from 'vitest';

describe('AuthResolver (integration)', () => {
  const userService = new UserService();

  it('deve realizar login com credenciais válidas', async () => {
    // Cria usuário para login
    const user = await userService.create({
      name: 'Teste',
      email: 'teste@teste.com',
      password: '123456'
    });

    const client = await createTestClient();

    const response = await client.post('/graphql').send({
      query: `
        mutation Login($data: LoginInput!) {
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

  it('deve lançar erro quando o usuário não existe', async () => {
    const client = await createTestClient();

    const response = await client.post('/graphql').send({
      query: `
        mutation Login($data: LoginInput!) {
          login(data: $data)
        }
      `,
      variables: {
        data: { email: 'inexistente@teste.com', password: '123456' }
      }
    });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });

  it('deve lançar erro quando a senha está incorreta', async () => {
    await userService.create({
      name: 'Teste',
      email: 'senha-errada@teste.com',
      password: '123456'
    });

    const client = await createTestClient();

    const response = await client.post('/graphql').send({
      query: `
        mutation Login($data: LoginInput!) {
          login(data: $data)
        }
      `,
      variables: {
        data: { email: 'senha-errada@teste.com', password: 'senha-errada' }
      }
    });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });

  describe('Erros inesperados', () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('deve manter o status HTTP correto mesmo com formatError customizado', async () => {
      const client = await createTestClient();

      const response = await client.post('/graphql').send({
        query: `mutation Login($data: LoginInput!) { login(data: $data) }`,
        variables: {
          data: { email: 'inexistente@teste.com', password: '123456' }
        }
      });

      expect(response.status).toBe(401); // valida o comportamento fim a fim
      expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
      expect(response.body.errors[0].extensions.http).toBeUndefined(); // ou defina o que espera aqui
    });

    it('não deve vazar detalhes internos quando ocorre um erro não tratado', async () => {
      // Força o método real a lançar um erro genérico, simulando falha inesperada
      vi.spyOn(UserService.prototype, 'findByEmail').mockRejectedValue(
        new Error('connection refused: ECONNREFUSED')
      );

      const client = await createTestClient();

      const response = await client.post('/graphql').send({
        query: `mutation Login($data: LoginInput!) { login(data: $data) }`,
        variables: { data: { email: 'qualquer@teste.com', password: '123456' } }
      });

      // A mensagem NÃO deve conter detalhes internos (stack, driver do banco, etc)
      expect(response.body.errors[0].message).not.toContain('ECONNREFUSED');
      expect(response.body.errors[0].message).not.toContain(
        'connection refused'
      );

      // O código deve cair no genérico, não em algo específico como UNAUTHORIZED
      expect(response.body.errors[0].extensions.code).toBe(
        'INTERNAL_SERVER_ERROR'
      );
    });

    it('deve reconhecer AppError mesmo após o graphql-js embrulhar o erro', async () => {
      const client = await createTestClient();

      const response = await client.post('/graphql').send({
        query: `mutation Login($data: LoginInput!) { login(data: $data) }`,
        variables: {
          data: { email: 'inexistente@teste.com', password: '123456' }
        }
      });

      expect(response.status).toBe(401);
      expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
      // Se voltar a dar INTERNAL_SERVER_ERROR aqui, é sinal de que o unwrap quebrou de novo
    });
  });
});
