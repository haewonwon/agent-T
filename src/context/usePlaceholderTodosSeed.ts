import { useLayoutEffect, useCallback, useRef } from 'react';
import type { Dispatch } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPlaceholderTodos } from '../api/placeholderTodos';
import { placeholderTodosSeedQueryKey } from '../queryKeys';
import { loadTasksFromStorage } from '../lib/todoStorage';
import type { TodoAction } from '../todoReducer';

const PLACEHOLDER_SEED_STALE_MS = 5 * 60 * 1000;
const PLACEHOLDER_SEED_GC_MS = 30 * 60 * 1000;

export type PlaceholderTodosQueryInfo = {
  status: string;
  fetchStatus: string;
  dataUpdatedAt: number;
  isStale: boolean;
  staleTimeMs: number;
};

/**
 * JSONPlaceholder 초기 시드 — TanStack Query + useLayoutEffect로 reducer 동기화
 * (파일 분리로 커밋·리뷰 단위를 나누기 쉽게 함)
 */
export function usePlaceholderTodosSeed(
  dispatch: Dispatch<TodoAction>,
  tasksLength: number,
  shouldFetchPlaceholder: boolean
) {
  const seedAppliedRef = useRef(false);

  const placeholderTodosQuery = useQuery({
    queryKey: placeholderTodosSeedQueryKey,
    queryFn: ({ signal }) => fetchPlaceholderTodos(signal),
    enabled: shouldFetchPlaceholder,
    staleTime: PLACEHOLDER_SEED_STALE_MS,
    gcTime: PLACEHOLDER_SEED_GC_MS,
  });

  useLayoutEffect(() => {
    if (!shouldFetchPlaceholder || !placeholderTodosQuery.data || seedAppliedRef.current) return;
    seedAppliedRef.current = true;
    dispatch({ type: 'SET_TASKS', payload: placeholderTodosQuery.data });
  }, [dispatch, shouldFetchPlaceholder, placeholderTodosQuery.data]);

  const isLoadingInitialTodos =
    shouldFetchPlaceholder &&
    tasksLength === 0 &&
    ((!placeholderTodosQuery.isError &&
      (placeholderTodosQuery.isPending || placeholderTodosQuery.isFetching)) ||
      (placeholderTodosQuery.isError && placeholderTodosQuery.isFetching));

  const initialTodosError =
    shouldFetchPlaceholder && placeholderTodosQuery.isError && tasksLength === 0
      ? placeholderTodosQuery.error instanceof Error
        ? placeholderTodosQuery.error.message
        : '초기 투두를 불러오지 못했습니다.'
      : null;

  const refetchPlaceholderTodos = placeholderTodosQuery.refetch;
  const retryInitialTodos = useCallback(() => {
    if (loadTasksFromStorage().length > 0 || tasksLength > 0) return;
    void refetchPlaceholderTodos();
  }, [tasksLength, refetchPlaceholderTodos]);

  const placeholderTodosQueryInfo: PlaceholderTodosQueryInfo | null = shouldFetchPlaceholder
    ? {
        status: placeholderTodosQuery.status,
        fetchStatus: placeholderTodosQuery.fetchStatus,
        dataUpdatedAt: placeholderTodosQuery.dataUpdatedAt,
        isStale: placeholderTodosQuery.isStale,
        staleTimeMs: PLACEHOLDER_SEED_STALE_MS,
      }
    : null;

  return {
    isLoadingInitialTodos,
    initialTodosError,
    retryInitialTodos,
    placeholderTodosQueryInfo,
  };
}
