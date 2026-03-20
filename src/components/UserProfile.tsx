import type { User } from '../App';

type UserProfileProps = {
  user: User | null;
  isLoadingUser: boolean;
  onRefreshUser: () => void;
};

function UserProfile({ user, isLoadingUser, onRefreshUser }: UserProfileProps) {
  return (
    <section>
      <h2>유저 프로필</h2>

      {isLoadingUser ? (
        <p>로딩 중...</p>
      ) : user ? (
        <>
          <img src={user.picture} alt={user.name} width={100} height={100} />
          <p>이름: {user.name}</p>
          <p>이메일: {user.email}</p>
        </>
      ) : (
        <p>유저 정보를 불러오지 못했습니다.</p>
      )}

      <button onClick={onRefreshUser}>새로고침</button>
    </section>
  );
}

export default UserProfile;
