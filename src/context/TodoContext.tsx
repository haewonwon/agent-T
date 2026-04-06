import { createContext, use, useReducer, useEffect, useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { Task, User, Category, Priority, FilterTab, SortBy } from '../types';
import { todoReducer } from '../todoReducer';
import { loadTasksFromStorage, persistTasks } from '../lib/todoStorage';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { parseFilterTab, parseSelectedCategory, parseSortBy } from '../lib/storageParsers';
import { usePlaceholderTodosSeed } from './usePlaceholderTodosSeed';
import { useTodoRandomUser } from './useTodoRandomUser';

const LS_FILTER_TAB = 'agentt-filter-tab';
const LS_SORT_BY = 'agentt-sort-by';
const LS_SELECTED_CATEGORY = 'agentt-selected-category';

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

  isLoadingInitialTodos: boolean;
  initialTodosError: string | null;
  retryInitialTodos: () => void;

  placeholderTodosQueryInfo: {
    status: string;
    fetchStatus: string;
    dataUpdatedAt: number;
    isStale: boolean;
    staleTimeMs: number;
  } | null;

  user: User | null;
  isLoadingUser: boolean;
  userError: string | null;
  refreshUser: () => void;
}

const TodoContext = createContext<TodoContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components -- useTodo는 TodoProvider와 쌍
export function useTodo() {
  const ctx = use(TodoContext);
  if (!ctx) throw new Error('useTodo must be used within TodoProvider');
  return ctx;
}

export function TodoProvider({ children }: { children: ReactNode }) {
  const [tasks, dispatch] = useReducer(todoReducer, [], () => loadTasksFromStorage());
  const [shouldFetchPlaceholder] = useState(() => loadTasksFromStorage().length === 0);

  const [filterTab, setFilterTab] = useLocalStorage<FilterTab>(
    LS_FILTER_TAB,
    '전체',
    parseFilterTab
  );
  const [sortBy, setSortBy] = useLocalStorage<SortBy>(LS_SORT_BY, 'created', parseSortBy);
  const [selectedCategory, setSelectedCategory] = useLocalStorage<Category | '전체'>(
    LS_SELECTED_CATEGORY,
    '전체',
    parseSelectedCategory
  );

  const {
    isLoadingInitialTodos,
    initialTodosError,
    retryInitialTodos,
    placeholderTodosQueryInfo,
  } = usePlaceholderTodosSeed(dispatch, tasks.length, shouldFetchPlaceholder);

  const { user, isLoadingUser, userError, refreshUser } = useTodoRandomUser();

  useEffect(() => {
    persistTasks(tasks);
  }, [tasks]);

  const addTask = (text: string, category: Category, priority: Priority) => {
    dispatch({ type: 'ADD', payload: { text, category, priority } });
  };

  const editTask = (id: number, newText: string, newCategory: Category, newPriority: Priority) => {
    dispatch({
      type: 'EDIT',
      payload: { id, text: newText, category: newCategory, priority: newPriority },
    });
  };

  const toggleTask = (id: number) => {
    dispatch({ type: 'TOGGLE', payload: { id } });
  };

  const deleteTask = (id: number) => {
    dispatch({ type: 'DELETE', payload: { id } });
  };

  const filteredTasks = useMemo(() => {
    return tasks
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
  }, [tasks, filterTab, selectedCategory, sortBy]);

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
        isLoadingInitialTodos,
        initialTodosError,
        retryInitialTodos,
        placeholderTodosQueryInfo,
        user,
        isLoadingUser,
        userError,
        refreshUser,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
