import { useNavigate } from 'react-router-dom';
import { useTodo } from '../context/TodoContext';
import UserProfile from '../components/UserProfile';

function SettingsPage() {
  const { user, isLoadingUser, refreshUser } = useTodo();
  const navigate = useNavigate();

  return (
    <div>
      <h2>설정</h2>

      <UserProfile user={user} isLoadingUser={isLoadingUser} onRefreshUser={refreshUser} />

      <div style={{ marginTop: '24px' }}>
        <button onClick={() => navigate('/')} style={{ padding: '8px 16px' }}>
          메인으로 돌아가기
        </button>
      </div>
    </div>
  );
}

export default SettingsPage;
