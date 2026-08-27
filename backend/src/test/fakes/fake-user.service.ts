import { IUserService } from '@/services/user/user.service.interface';
import { vi } from 'vitest';

export class FakeUserService implements IUserService {
  findAll = vi.fn();
  create = vi.fn();
  update = vi.fn();
  delete = vi.fn();
  findByEmail = vi.fn();
}
