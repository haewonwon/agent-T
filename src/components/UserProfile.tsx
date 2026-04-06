import type { User } from '../types';
import LoadingSpinner from './LoadingSpinner';
import ErrorRetryBanner from './ErrorRetryBanner';

type UserProfileProps = {
  user: User | null;
  isLoadingUser: boolean;
  userError: string | null;
  onRefreshUser: () => void;
};

function UserProfile({ user, isLoadingUser, userError, onRefreshUser }: UserProfileProps) {
  return (
    <section>
      <h2>유저 프로필</h2>

      {isLoadingUser && (
        <div style={{ margin: '12px 0' }}>
          <LoadingSpinner size={28} label="프로필을 불러오는 중…" />
        </div>
      )}

      {!isLoadingUser && userError && (
        <ErrorRetryBanner
          message={`유저 정보를 불러오지 못했습니다. (${userError})`}
          onRetry={onRefreshUser}
          retryLabel="다시 불러오기"
        />
      )}

      {!isLoadingUser && user && (
        <>
          <img src={user.picture} alt={user.name} width={100} height={100} />
          <p>이름: {user.name}</p>
          <p>이메일: {user.email}</p>
        </>
      )}

      {!isLoadingUser && user && !userError && (
        <div style={{ marginTop: '12px' }}>
          <button type="button" onClick={onRefreshUser} style={{ padding: '8px 16px' }}>
            다른 유저로 새로고침
          </button>
        </div>
      )}

      {!isLoadingUser && !user && !userError && (
        <p style={{ color: '#666' }}>표시할 프로필이 없습니다.</p>
      )}
    </section>
  );
}

export default UserProfile;
