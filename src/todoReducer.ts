import type { Category, Priority, Task } from './types';

export type TodoAction =
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'ADD'; payload: { text: string; category: Category; priority: Priority } }
  | {
      type: 'EDIT';
      payload: { id: number; text: string; category: Category; priority: Priority };
    }
  | { type: 'TOGGLE'; payload: { id: number } }
  | { type: 'DELETE'; payload: { id: number } };

export function todoReducer(state: Task[], action: TodoAction): Task[] {
  switch (action.type) {
    case 'SET_TASKS':
      return action.payload;
    case 'ADD':
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload.text,
          done: false,
          category: action.payload.category,
          priority: action.payload.priority,
        },
      ];
    case 'EDIT':
      return state.map((task) =>
        task.id === action.payload.id
          ? {
              ...task,
              text: action.payload.text,
              category: action.payload.category,
              priority: action.payload.priority,
            }
          : task
      );
    case 'TOGGLE':
      return state.map((task) =>
        task.id === action.payload.id ? { ...task, done: !task.done } : task
      );
    case 'DELETE':
      return state.filter((task) => task.id !== action.payload.id);
    default:
      return state;
  }
}
