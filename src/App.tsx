import { useEffect, useState } from 'react';
import TextInput from './components/TextInput';
import TaskList from './components/TaskList';
import UserProfile from './components/UserProfile';

export type Task = {
  id: number;
  text: string;
  done: boolean;
};

export type User = {
  name: string;
  email: string;
  picture: string;
};

function App() {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  const fetchRandomUser = async () => {
    try {
      setIsLoadingUser(true);

      const response = await fetch('https://randomuser.me/api/');
      const data = await response.json();
      const result = data.results[0];

      setUser({
        name: `${result.name.last}${result.name.first}`,
        email: result.email,
        picture: result.picture.large,
      });
    } catch (error) {
      console.error('유저 정보를 불러오지 못했습니다.', error);
    } finally {
      setIsLoadingUser(false);
    }
  };

  useEffect(() => {
    fetchRandomUser();
  }, []);

  const handleTextChange = (value: string) => {
    setText(value);

    if (value.length > 20) {
      setError('20자 이상 입력할 수 없습니다.');
      return;
    }

    setError('');
  };

  const handleAddTask = () => {
    const trimmedText = text.trim();

    if (!trimmedText || error) return;

    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: trimmedText,
        done: false,
      },
    ]);

    setText('');
    setError('');
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key !== 'Enter') return;

    e.preventDefault();
    handleAddTask();
  };

  const handleToggleTask = (id: number) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, done: !task.done } : task)));
  };

  const handleDeleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleRefreshUser = () => {
    fetchRandomUser();
  };

  return (
    <>
      <h1>Todo App</h1>

      <TextInput
        text={text}
        error={error}
        onTextChange={handleTextChange}
        onKeyDown={handleInputKeyDown}
        onAddTask={handleAddTask}
      />

      <TaskList tasks={tasks} onToggleTask={handleToggleTask} onDeleteTask={handleDeleteTask} />

      <UserProfile user={user} isLoadingUser={isLoadingUser} onRefreshUser={handleRefreshUser} />
    </>
  );
}

export default App;
