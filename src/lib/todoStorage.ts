import type { Task } from '../types';
import { CATEGORIES } from '../types';

/** client-localstorage-schema: 스키마 변경 시 버전 올리고 구 포맷은 마이그레이션 또는 제거 */
export const TODO_STORAGE_KEY = 'agentt-todos-v1';
const SCHEMA_VERSION = 1 as const;

type TodoStorageV1 = {
  version: typeof SCHEMA_VERSION;
  tasks: Task[];
};

function isCategory(value: unknown): value is Task['category'] {
  return typeof value === 'string' && (CATEGORIES as readonly string[]).includes(value);
}

function isPriority(value: unknown): value is Task['priority'] {
  return value === 1 || value === 2 || value === 3;
}

function isValidTask(value: unknown): value is Task {
  if (typeof value !== 'object' || value === null) return false;
  const o = value as Record<string, unknown>;
  return (
    typeof o.id === 'number' &&
    typeof o.text === 'string' &&
    typeof o.done === 'boolean' &&
    isCategory(o.category) &&
    isPriority(o.priority)
  );
}

function clearCorruptedStorage(): void {
  try {
    localStorage.removeItem(TODO_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

/** 레거시: Task[]만 저장돼 있던 형식 → v1 래퍼로 다시 저장 */
function migrateLegacyArray(raw: unknown): Task[] | null {
  if (!Array.isArray(raw)) return null;
  const tasks = raw.filter(isValidTask);
  persistTasks(tasks);
  return tasks;
}

export function loadTasksFromStorage(): Task[] {
  try {
    const raw = localStorage.getItem(TODO_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);

    if (parsed && typeof parsed === 'object' && 'version' in parsed && 'tasks' in parsed) {
      const o = parsed as { version: unknown; tasks: unknown };
      if (o.version !== SCHEMA_VERSION || !Array.isArray(o.tasks)) {
        throw new Error('schema mismatch');
      }
      return o.tasks.filter(isValidTask);
    }

    const migrated = migrateLegacyArray(parsed);
    if (migrated) return migrated;

    throw new Error('invalid shape');
  } catch {
    clearCorruptedStorage();
    return [];
  }
}

export function persistTasks(tasks: Task[]): void {
  try {
    const payload: TodoStorageV1 = { version: SCHEMA_VERSION, tasks };
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* quota / private mode */
  }
}
