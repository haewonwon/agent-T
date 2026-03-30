import { useNavigate } from 'react-router-dom';
import { useTodo } from '../context/TodoContext';
import TextInput from '../components/TextInput';
import TaskList from '../components/TaskList';
import FilterTabs from '../components/FilterTabs';

function MainPage() {
  const navigate = useNavigate();
  const {
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
  } = useTodo();

  return (
    <div>
      <TextInput onAddTask={addTask} />

      <FilterTabs
        filterTab={filterTab}
        onFilterTabChange={setFilterTab}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortByChange={setSortBy}
      />

      <TaskList
        tasks={filteredTasks}
        onToggleTask={toggleTask}
        onDeleteTask={deleteTask}
        onEditTask={editTask}
        onNavigateToDetail={(id) => navigate(`/todo/${id}`)}
      />
    </div>
  );
}

export default MainPage;
