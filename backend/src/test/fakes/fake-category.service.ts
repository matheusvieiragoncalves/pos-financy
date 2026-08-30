import { ICategoryService } from '@/services/category/category.service.interface';
import { vi } from 'vitest';

export class FakeCategoryService implements ICategoryService {
  findAll = vi.fn();
  create = vi.fn();
  update = vi.fn();
  delete = vi.fn();
  findById = vi.fn();
}
