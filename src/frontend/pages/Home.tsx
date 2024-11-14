import { useNavigate } from 'react-router-dom';
import { SolidFillButton } from '../../frontend/base/inputs';

export default function Home() {
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
      <h1>Home</h1>
      <SolidFillButton
        onClick={() => {
          window.work.startWork().then((ok) => {
            console.log(ok);

            if (ok) {
              console.log('/work');

              navigate('/work');
            }
          });
        }}
      >
        업무시작
      </SolidFillButton>
    </div>
  );
}
