import { useNavigate } from 'react-router-dom';
import { SolidFillButton } from '../base/inputs';

export default function Work() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: '12px',
        padding: '12px',
        boxSizing: 'border-box',
      }}
    >
      <h1>업무중</h1>
      <SolidFillButton
        onClick={() => {
          window.work.finishWork().then((ok) => {
            if (ok) {
              navigate('/home');
            }
          });
        }}
      >
        업무종료
      </SolidFillButton>
    </div>
  );
}
