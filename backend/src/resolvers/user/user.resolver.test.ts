import type { UserService } from '@/services/user/user.service';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UserResolver } from './user.resolver';

describe('UserResolver (unit)', () => {
  let userService: UserService;
  let resolver: UserResolver;

  beforeEach(() => {
    userService = {
      findAll: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn()
    } as unknown as UserService;

    resolver = new UserResolver(userService);
  });

  it('deve chamar userService.create com os dados corretos', async () => {
    const input = { name: 'John', email: 'john@test.com', password: '123456' };
    vi.mocked(userService.create).mockResolvedValue({
      id: '1',
      ...input
    } as any);

    const result = await resolver.userCreate(input);

    expect(userService.create).toHaveBeenCalledWith(input);
    expect(result.id).toBe('1');
  });

  it('deve retornar todos os usuários de userService.findAll', async () => {
    vi.mocked(userService.findAll).mockResolvedValue([{ id: '1' } as any]);

    const result = await resolver.users();

    expect(result).toHaveLength(1);
    expect(userService.findAll).toHaveBeenCalledOnce();
  });
});
