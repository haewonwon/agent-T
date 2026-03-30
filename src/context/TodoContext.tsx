import { createContext, use, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Task, User, Category, Priority, FilterTab, SortBy } from '../types';

interface TodoContextType {
  tasks: Task[];
  addTask: (text: string, category: Category, priority: Priority) => void;
  editTask: (id: number, newText: string, newCategory: Category, newPriority: Priority) => void;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;

  filterTab: FilterTab;
  setFilterTab: (tab: FilterTab) => void;

  selectedCategory: Category | '전체';
  setSelectedCategory: (cat: Category | '전체') => void;

  sortBy: SortBy;
  setSortBy: (sort: SortBy) => void;

  filteredTasks: Task[];

  user: User | null;
  isLoadingUser: boolean;
  refreshUser: () => void;
}

const TodoContext = createContext<TodoContextType | null>(null);

export function useTodo() {
  const ctx = use(TodoContext);
  if (!ctx) throw new Error('useTodo must be used within TodoProvider');
  return ctx;
}

export function TodoProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [filterTab, setFilterTab] = useState<FilterTab>('전체');
  const [selectedCategory, setSelectedCategory] = useState<Category | '전체'>('전체');
  const [sortBy, setSortBy] = useState<SortBy>('created');

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
    } catch (err) {
      console.error('유저 정보를 불러오지 못했습니다.', err);
    } finally {
      setIsLoadingUser(false);
    }
  };

  useEffect(() => {
    fetchRandomUser();
  }, []);

  const addTask = (text: string, category: Category, priority: Priority) => {
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), text, done: false, category, priority },
    ]);
  };

  const editTask = (id: number, newText: string, newCategory: Category, newPriority: Priority) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, text: newText, category: newCategory, priority: newPriority }
          : task
      )
    );
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filterTab === '완료') return task.done;
      if (filterTab === '미완료') return !task.done;
      return true;
    })
    .filter((task) => {
      if (selectedCategory === '전체') return true;
      return task.category === selectedCategory;
    })
    .toSorted((a, b) => {
      if (sortBy === 'priority') return a.priority - b.priority;
      return a.id - b.id;
    });

  return (
    <TodoContext.Provider
      value={{
        tasks,
        addTask,
        editTask,
        toggleTask,
        deleteTask,
        filterTab,
        setFilterTab,
        selectedCategory,
        setSelectedCategory,
        sortBy,
        setSortBy,
        filteredTasks,
        user,
        isLoadingUser,
        refreshUser: fetchRandomUser,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
