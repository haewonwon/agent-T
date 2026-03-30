import { useState } from 'react';
import type { Category, Priority } from '../types';
import { CATEGORIES, PRIORITY_LABELS } from '../types';

type TextInputProps = {
  onAddTask: (text: string, category: Category, priority: Priority) => void;
};

function TextInput({ onAddTask }: TextInputProps) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [category, setCategory] = useState<Category>('일반');
  const [priority, setPriority] = useState<Priority>(2);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
    setError(value.length > 20 ? '20자 이상 입력할 수 없습니다.' : '');
  };

  const handleAdd = () => {
    const trimmed = text.trim();
    if (!trimmed || error) return;
    onAddTask(trimmed, category, priority);
    setText('');
    setError('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key !== 'Enter') return;
    e.preventDefault();
    handleAdd();
  };

  const isDisabled = Boolean(error) || !text.trim();

  return (
    <section style={{ marginBottom: '24px' }}>
      <h2>할 일 입력</h2>

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
        <input
          type="text"
          value={text}
          placeholder="할 일을 입력하세요"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          style={{ flex: 1, minWidth: '200px', padding: '8px' }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          style={{ padding: '8px' }}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value) as Priority)}
          style={{ padding: '8px' }}
        >
          {([1, 2, 3] as Priority[]).map((p) => (
            <option key={p} value={p}>
              우선순위: {PRIORITY_LABELS[p]}
            </option>
          ))}
        </select>

        <button disabled={isDisabled} onClick={handleAdd} style={{ padding: '8px 16px' }}>
          추가
        </button>
      </div>

      <p
        style={{
          margin: '4px 0',
          fontSize: '14px',
          color: text.length > 20 ? 'red' : '#666',
        }}
      >
        {text.length}/20
      </p>
      {error && (
        <p style={{ color: 'red', margin: '4px 0', fontSize: '14px' }}>{error}</p>
      )}
    </section>
  );
}

export default TextInput;
