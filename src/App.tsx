import { useEffect, useState } from 'react';

type Task = {
  id: number;
  text: string;
  done: boolean;
};

type User = {
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

  useEffect(() => {
    const getRandomUser = async () => {
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

    getRandomUser();
  }, []);

  return (
    <>
      <h1>Todo App</h1>

      <section>
        <h2>할 일 입력</h2>

        <input
          type="text"
          value={text}
          placeholder="할 일을 입력하세요"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;

            setText(value);

            if (value.length > 20) {
              setError('20자 이상 입력할 수 없습니다.');
            } else {
              setError('');
            }
          }}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.nativeEvent.isComposing) return;

            if (e.key === 'Enter') {
              e.preventDefault();

              const value = e.currentTarget.value.trim();

              if (!value || error) return;

              setTasks((prev) => [
                ...prev,
                {
                  id: Date.now(),
                  text: value,
                  done: false,
                },
              ]);

              setText('');
              setError('');
            }
          }}
        />

        <p>{text.length}/20</p>
        {error && <p>{error}</p>}

        <button
          disabled={Boolean(error) || !text.trim()}
          onClick={() => {
            if (!text.trim()) return;
            if (error) return;

            setTasks((prev) => [
              ...prev,
              {
                id: Date.now(),
                text: text.trim(),
                done: false,
              },
            ]);
            setText('');
            setError('');
          }}
        >
          추가
        </button>
      </section>

      <section>
        <h2>할 일 목록</h2>

        {tasks.length === 0 ? (
          <p>등록된 할 일이 없습니다.</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <span
                  style={{
                    textDecoration: task.done ? 'line-through' : 'none',
                    marginRight: '8px',
                  }}
                >
                  {task.text}
                </span>

                <button
                  onClick={() => {
                    setTasks((prev) =>
                      prev.map((item) =>
                        item.id === task.id ? { ...item, done: !item.done } : item,
                      ),
                    );
                  }}
                >
                  {task.done ? '완료 취소' : '완료'}
                </button>

                <button
                  onClick={() => {
                    setTasks((prev) => prev.filter((item) => item.id !== task.id));
                  }}
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2>유저 프로필</h2>

        {isLoadingUser ? (
          <p>로딩 중...</p>
        ) : user ? (
          <>
            <img src={user.picture} alt={user.name} width={100} height={100} />
            <p>이름: {user.name}</p>
            <p>이메일: {user.email}</p>
          </>
        ) : (
          <p>유저 정보를 불러오지 못했습니다.</p>
        )}

        <button
          onClick={async () => {
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
              console.error('유저 정보를 다시 불러오지 못했습니다.', error);
            } finally {
              setIsLoadingUser(false);
            }
          }}
        >
          새로고침
        </button>
      </section>
    </>
  );
}

export default App;
