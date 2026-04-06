import type { User } from '../types';

const RANDOM_USER_URL = 'https://randomuser.me/api/';

export async function fetchRandomUserProfile(signal: AbortSignal): Promise<User> {
  const response = await fetch(RANDOM_USER_URL, { signal });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const data: unknown = await response.json();
  const results =
    data && typeof data === 'object' && 'results' in data
      ? (data as { results: unknown }).results
      : null;
  if (!Array.isArray(results) || results.length === 0) {
    throw new Error('유저 데이터 형식이 올바르지 않습니다.');
  }
  const result = results[0] as {
    name: { last: string; first: string };
    email: string;
    picture: { large: string };
  };
  return {
    name: `${result.name.last}${result.name.first}`,
    email: result.email,
    picture: result.picture.large,
  };
}
