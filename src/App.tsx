import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { TodoProvider } from './context/TodoContext';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import SettingsPage from './pages/SettingsPage';

function AppLayout() {
  const location = useLocation();

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px' }}>
      <header style={{ marginBottom: '24px' }}>
        <h1>Todo App</h1>
        <nav style={{ display: 'flex', gap: '12px' }}>
          <Link
            to="/"
            style={{
              fontWeight: location.pathname === '/' ? 'bold' : 'normal',
              textDecoration: 'none',
              color: location.pathname === '/' ? '#333' : '#888',
            }}
          >
            메인
          </Link>
          <Link
            to="/settings"
            style={{
              fontWeight: location.pathname === '/settings' ? 'bold' : 'normal',
              textDecoration: 'none',
              color: location.pathname === '/settings' ? '#333' : '#888',
            }}
          >
            설정
          </Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/todo/:id" element={<DetailPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <TodoProvider>
      <AppLayout />
    </TodoProvider>
  );
}

export default App;
