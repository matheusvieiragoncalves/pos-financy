import { describe, expect, it } from 'vitest';
import { UserResolver } from './user.resolver';

describe('UserResolver (unit)', () => {
  it('deve retornar Hello World', async () => {
    const resolver = new UserResolver();
    const result = await resolver.helloWorld();

    expect(result).toBe('Hello World');
  });
});
