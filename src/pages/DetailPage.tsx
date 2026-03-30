import { useParams, useNavigate } from 'react-router-dom';
import { useTodo } from '../context/TodoContext';
import { PRIORITY_LABELS } from '../types';

function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tasks, toggleTask, deleteTask } = useTodo();

  const task = tasks.find((t) => t.id === Number(id));

  if (!task) {
    return (
      <div>
        <h2>할 일을 찾을 수 없습니다</h2>
        <p>해당 할 일이 존재하지 않거나 삭제되었습니다.</p>
        <button onClick={() => navigate('/')} style={{ padding: '8px 16px' }}>
          메인으로 돌아가기
        </button>
      </div>
    );
  }

  const handleDelete = () => {
    deleteTask(task.id);
    navigate('/');
  };

  return (
    <div>
      <h2>할 일 상세</h2>

      <div
        style={{
          padding: '16px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          marginBottom: '16px',
        }}
      >
        <h3
          style={{
            textDecoration: task.done ? 'line-through' : 'none',
            color: task.done ? '#999' : 'inherit',
          }}
        >
          {task.text}
        </h3>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            marginTop: '12px',
            fontSize: '14px',
            color: '#555',
          }}
        >
          <p>
            상태: <strong>{task.done ? '완료' : '미완료'}</strong>
          </p>
          <p>
            카테고리: <strong>{task.category}</strong>
          </p>
          <p>
            우선순위: <strong>{PRIORITY_LABELS[task.priority]}</strong>
          </p>
          <p>
            생성일: <strong>{new Date(task.id).toLocaleString('ko-KR')}</strong>
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => toggleTask(task.id)} style={{ padding: '8px 16px' }}>
          {task.done ? '완료 취소' : '완료 처리'}
        </button>
        <button onClick={handleDelete} style={{ padding: '8px 16px', color: 'red' }}>
          삭제
        </button>
        <button onClick={() => navigate('/')} style={{ padding: '8px 16px' }}>
          돌아가기
        </button>
      </div>
    </div>
  );
}

export default DetailPage;
