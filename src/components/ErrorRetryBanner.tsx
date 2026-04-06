type ErrorRetryBannerProps = {
  message: string;
  onRetry: () => void;
  retryLabel?: string;
};

export default function ErrorRetryBanner({
  message,
  onRetry,
  retryLabel = '다시 시도',
}: ErrorRetryBannerProps) {
  return (
    <div
      role="alert"
      style={{
        marginBottom: '16px',
        padding: '14px 16px',
        background: '#fff5f5',
        borderRadius: '8px',
        border: '1px solid #f0c0c0',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '12px',
      }}
    >
      <p style={{ margin: 0, flex: '1 1 200px', color: '#b91c1c', fontSize: '14px' }}>
        {message}
      </p>
      <button
        type="button"
        onClick={onRetry}
        style={{
          padding: '8px 16px',
          fontSize: '14px',
          cursor: 'pointer',
          borderRadius: '6px',
          border: '1px solid #ccc',
          background: '#fff',
          fontWeight: 500,
        }}
      >
        {retryLabel}
      </button>
    </div>
  );
}
