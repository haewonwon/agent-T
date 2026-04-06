import './LoadingSpinner.css';

type LoadingSpinnerProps = {
  /** 링 직경(px) */
  size?: number;
  /** 스크린 리더용 */
  label?: string;
};

export default function LoadingSpinner({ size = 28, label = '불러오는 중' }: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        color: '#444',
        fontSize: '14px',
      }}
    >
      <span
        className="agentt-spinner__ring"
        style={{
          width: size,
          height: size,
          borderWidth: Math.max(2, Math.round(size / 8)),
        }}
        aria-hidden
      />
      <span>{label}</span>
    </div>
  );
}
