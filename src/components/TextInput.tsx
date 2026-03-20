type TextInputProps = {
  text: string;
  error: string;
  onTextChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onAddTask: () => void;
};

function TextInput({ text, error, onTextChange, onKeyDown, onAddTask }: TextInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTextChange(e.target.value);
  };

  const isDisabled = Boolean(error) || !text.trim();

  return (
    <section>
      <h2>할 일 입력</h2>

      <input
        type="text"
        value={text}
        placeholder="할 일을 입력하세요"
        onChange={handleChange}
        onKeyDown={onKeyDown}
      />

      <p>{text.length}/20</p>
      {error && <p>{error}</p>}

      <button disabled={isDisabled} onClick={onAddTask}>
        추가
      </button>
    </section>
  );
}

export default TextInput;
