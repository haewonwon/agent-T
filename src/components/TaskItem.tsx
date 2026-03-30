import { useState } from 'react';
import type { Task, Category, Priority } from '../types';
import { CATEGORIES, PRIORITY_LABELS } from '../types';

type TaskItemProps = {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string, category: Category, priority: Priority) => void;
  onNavigate: (id: number) => void;
};

const priorityColors: Record<Priority, string> = {
  1: '#e74c3c',
  2: '#f39c12',
  3: '#3498db',
};

function TaskItem({ task, onToggle, onDelete, onEdit, onNavigate }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editCategory, setEditCategory] = useState<Category>(task.category);
  const [editPriority, setEditPriority] = useState<Priority>(task.priority);

  const handleSave = () => {
    const trimmed = editText.trim();
    if (!trimmed || trimmed.length > 20) return;
    onEdit(task.id, trimmed, editCategory, editPriority);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(task.text);
    setEditCategory(task.category);
    setEditPriority(task.priority);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <li
        style={{
          padding: '8px 0',
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ flex: 1, minWidth: '150px', padding: '4px 8px' }}
          autoFocus
        />
        <select
          value={editCategory}
          onChange={(e) => setEditCategory(e.target.value as Category)}
          style={{ padding: '4px' }}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          value={editPriority}
          onChange={(e) => setEditPriority(Number(e.target.value) as Priority)}
          style={{ padding: '4px' }}
        >
          {([1, 2, 3] as Priority[]).map((p) => (
            <option key={p} value={p}>
              {PRIORITY_LABELS[p]}
            </option>
          ))}
        </select>
        <button onClick={handleSave} style={{ padding: '4px 12px' }}>
          저장
        </button>
        <button onClick={handleCancel} style={{ padding: '4px 12px' }}>
          취소
        </button>
      </li>
    );
  }

  return (
    <li
      style={{
        padding: '8px 0',
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: priorityColors[task.priority],
        }}
        title={`우선순위: ${PRIORITY_LABELS[task.priority]}`}
      />
      <span
        style={{
          textDecoration: task.done ? 'line-through' : 'none',
          color: task.done ? '#999' : 'inherit',
          cursor: 'pointer',
        }}
        onClick={() => onNavigate(task.id)}
      >
        {task.text}
      </span>
      <span
        style={{
          fontSize: '12px',
          color: '#888',
          backgroundColor: '#f0f0f0',
          padding: '2px 8px',
          borderRadius: '12px',
        }}
      >
        {task.category}
      </span>
      <span style={{ marginLeft: 'auto', display: 'flex', gap: '4px' }}>
        <button onClick={() => onToggle(task.id)} style={{ padding: '4px 8px' }}>
          {task.done ? '완료 취소' : '완료'}
        </button>
        <button onClick={() => setIsEditing(true)} style={{ padding: '4px 8px' }}>
          수정
        </button>
        <button onClick={() => onDelete(task.id)} style={{ padding: '4px 8px' }}>
          삭제
        </button>
      </span>
    </li>
  );
}

export default TaskItem;
