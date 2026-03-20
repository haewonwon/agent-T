import type { Task } from '../App';

type TaskListProps = {
  tasks: Task[];
  onToggleTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
};

function TaskList({ tasks, onToggleTask, onDeleteTask }: TaskListProps) {
  const handleToggleClick = (id: number) => {
    onToggleTask(id);
  };

  const handleDeleteClick = (id: number) => {
    onDeleteTask(id);
  };

  return (
    <section>
      <h2>할 일 목록</h2>

      {tasks.length === 0 ? (
        <p>등록된 할 일이 없습니다.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <span
                style={{
                  textDecoration: task.done ? 'line-through' : 'none',
                  marginRight: '8px',
                }}
              >
                {task.text}
              </span>

              <button onClick={() => handleToggleClick(task.id)}>
                {task.done ? '완료 취소' : '완료'}
              </button>

              <button onClick={() => handleDeleteClick(task.id)}>삭제</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default TaskList;
