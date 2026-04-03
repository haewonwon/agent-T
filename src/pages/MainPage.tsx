import { useNavigate } from 'react-router-dom';
import { useTodo } from '../context/TodoContext';
import TextInput from '../components/TextInput';
import TaskList from '../components/TaskList';
import FilterTabs from '../components/FilterTabs';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorRetryBanner from '../components/ErrorRetryBanner';

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
    isLoadingInitialTodos,
    initialTodosError,
    retryInitialTodos,
    placeholderTodosQueryInfo,
  } = useTodo();

  return (
    <div>
      {placeholderTodosQueryInfo && (
        <details
          style={{
            fontSize: '13px',
            color: '#555',
            marginBottom: '16px',
            padding: '10px 12px',
            background: '#f7f7f7',
            borderRadius: '8px',
            border: '1px solid #e8e8e8',
          }}
        >
          <summary style={{ cursor: 'pointer', fontWeight: 600 }}>
            TanStack Query — 캐싱·상태 (수동 fetch와 비교)
          </summary>
          <ul style={{ margin: '10px 0 0', paddingLeft: '1.25rem', lineHeight: 1.5 }}>
            <li>
              <strong>queryKey</strong> <code>placeholderTodos / seed</code> — 동일 키면 캐시 재사용, 탭 이동·리마운트 후에도{' '}
              <code>staleTime</code> 안이면 네트워크 생략 가능
            </li>
            <li>
              <strong>status</strong> {placeholderTodosQueryInfo.status} · <strong>fetchStatus</strong>{' '}
              {placeholderTodosQueryInfo.fetchStatus} — 로딩/재시도/대기 상태를 한 객체로 추적
            </li>
            <li>
              <strong>isStale</strong> {String(placeholderTodosQueryInfo.isStale)} ·{' '}
              <strong>staleTime</strong> {placeholderTodosQueryInfo.staleTimeMs / 60000}분 — 신선하지 않을 때만
              백그라운드 refetch 등 정책 적용
            </li>
            <li>
              <strong>dataUpdatedAt</strong>{' '}
              {placeholderTodosQueryInfo.dataUpdatedAt
                ? new Date(placeholderTodosQueryInfo.dataUpdatedAt).toLocaleString('ko-KR')
                : '—'}
            </li>
          </ul>
          <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#777' }}>
            이전 패턴(useEffect + useState로 loading/error 직접 관리)은 직관적이지만, 캐시·중복 요청 제거·
            refetch 일원화는 TanStack Query에 맡기는 편이 유지보수에 유리합니다. 투두 CRUD·localStorage는 그대로
            reducer에서 다룹니다.
          </p>
        </details>
      )}

      {isLoadingInitialTodos && (
        <div style={{ marginBottom: '16px' }}>
          <LoadingSpinner
            size={30}
            label="JSONPlaceholder에서 초기 투두를 불러오는 중…"
          />
        </div>
      )}
      {initialTodosError && (
        <ErrorRetryBanner
          message={`초기 투두를 불러오지 못했습니다. (${initialTodosError})`}
          onRetry={retryInitialTodos}
        />
      )}

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
