import type { Task, Category, Priority } from '../types';
import TaskItem from './TaskItem';

type TaskListProps = {
  tasks: Task[];
  onToggleTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
  onEditTask: (id: number, text: string, category: Category, priority: Priority) => void;
  onNavigateToDetail: (id: number) => void;
};

function TaskList({
  tasks,
  onToggleTask,
  onDeleteTask,
  onEditTask,
  onNavigateToDetail,
}: TaskListProps) {
  return (
    <section>
      <h2>할 일 목록 ({tasks.length})</h2>

      {tasks.length === 0 ? (
        <p style={{ color: '#999' }}>등록된 할 일이 없습니다.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggleTask}
              onDelete={onDeleteTask}
              onEdit={onEditTask}
              onNavigate={onNavigateToDetail}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default TaskList;
