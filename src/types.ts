export type Category = '일반' | '업무' | '개인' | '공부';
export type Priority = 1 | 2 | 3;
export type FilterTab = '전체' | '완료' | '미완료';
export type SortBy = 'created' | 'priority';

export type Task = {
  id: number;
  text: string;
  done: boolean;
  category: Category;
  priority: Priority;
};

export type User = {
  name: string;
  email: string;
  picture: string;
};

export const CATEGORIES: Category[] = ['일반', '업무', '개인', '공부'];

export const PRIORITY_LABELS: Record<Priority, string> = {
  1: '높음',
  2: '보통',
  3: '낮음',
};
