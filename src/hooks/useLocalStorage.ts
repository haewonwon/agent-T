import { useCallback, useState } from 'react';

/**
 * Custom Hook — 로컬 상태 + localStorage 동기화 (lazy 초기값으로 매 렌더 파싱 방지)
 */
function readStored<T>(key: string, initial: T, validate?: (parsed: unknown) => T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return initial;
    const parsed: unknown = JSON.parse(raw);
    return validate ? validate(parsed) : (parsed as T);
  } catch {
    return initial;
  }
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  validate?: (parsed: unknown) => T
): readonly [T, (value: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => readStored(key, initialValue, validate));

  const setAndStore = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? (next as (p: T) => T)(prev) : next;
        try {
          localStorage.setItem(key, JSON.stringify(resolved));
        } catch {
          /* quota */
        }
        return resolved;
      });
    },
    [key]
  );

  return [value, setAndStore] as const;
}
