import type { Category, Priority, Task } from '../types';

const PLACEHOLDER_TODOS_URL =
  'https://jsonplaceholder.typicode.com/todos?_limit=20';

type JsonPlaceholderRow = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

function isRow(value: unknown): value is JsonPlaceholderRow {
  if (typeof value !== 'object' || value === null) return false;
  const o = value as Record<string, unknown>;
  return (
    typeof o.userId === 'number' &&
    typeof o.id === 'number' &&
    typeof o.title === 'string' &&
    typeof o.completed === 'boolean'
  );
}

const CATEGORIES_ROTATE: Category[] = ['일반', '업무', '개인', '공부'];

function mapRowToTask(row: JsonPlaceholderRow): Task {
  return {
    id: row.id,
    text: row.title,
    done: row.completed,
    category: CATEGORIES_ROTATE[row.userId % CATEGORIES_ROTATE.length],
    priority: ((row.id % 3) + 1) as Priority,
  };
}

/** JSONPlaceholder `/todos` → 앱 `Task[]` (언마운트·쿼리 취소 시 `AbortSignal`로 중단) */
export async function fetchPlaceholderTodos(signal?: AbortSignal): Promise<Task[]> {
  const res = await fetch(PLACEHOLDER_TODOS_URL, { signal });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  const data: unknown = await res.json();
  if (!Array.isArray(data)) {
    throw new Error('응답이 배열이 아닙니다.');
  }
  return data.filter(isRow).map(mapRowToTask);
}
