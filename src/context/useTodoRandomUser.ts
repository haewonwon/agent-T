import { useState, useEffect, useCallback, useRef } from 'react';
import type { User } from '../types';
import { fetchRandomUserProfile } from '../api/randomUser';

/**
 * Random User API — 마운트 시 useEffect + AbortController cleanup,
 * 수동 새로고침은 이벤트 기반 + 이전 요청 abort
 */
export function useTodoRandomUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [userError, setUserError] = useState<string | null>(null);
  const refreshAbortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetchRandomUserProfile(controller.signal)
      .then((u) => {
        setUser(u);
        setUserError(null);
      })
      .catch((e: unknown) => {
        if (e instanceof DOMException && e.name === 'AbortError') return;
        setUserError(e instanceof Error ? e.message : '유저 정보를 불러오지 못했습니다.');
      })
      .finally(() => {
        setIsLoadingUser(false);
      });

    return () => controller.abort();
  }, []);

  const refreshUser = useCallback(() => {
    refreshAbortRef.current?.abort();
    const controller = new AbortController();
    refreshAbortRef.current = controller;
    setIsLoadingUser(true);
    setUserError(null);

    fetchRandomUserProfile(controller.signal)
      .then((u) => {
        setUser(u);
        setUserError(null);
      })
      .catch((e: unknown) => {
        if (e instanceof DOMException && e.name === 'AbortError') return;
        setUserError(e instanceof Error ? e.message : '유저 정보를 불러오지 못했습니다.');
      })
      .finally(() => {
        if (refreshAbortRef.current === controller) {
          refreshAbortRef.current = null;
          setIsLoadingUser(false);
        }
      });
  }, []);

  return { user, isLoadingUser, userError, refreshUser };
}
