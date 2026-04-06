import type { Category, FilterTab, SortBy } from '../types';
import { CATEGORIES } from '../types';

export function parseFilterTab(value: unknown): FilterTab {
  if (value === '전체' || value === '완료' || value === '미완료') return value;
  return '전체';
}

export function parseSortBy(value: unknown): SortBy {
  if (value === 'created' || value === 'priority') return value;
  return 'created';
}

export function parseSelectedCategory(value: unknown): Category | '전체' {
  if (value === '전체') return '전체';
  if (typeof value === 'string' && (CATEGORIES as readonly string[]).includes(value)) {
    return value as Category;
  }
  return '전체';
}
