import { useNavigate } from 'react-router-dom';
import { RoundedFillButton, SolidFillButton, TextField } from '../base/inputs';
import CircleProgress from '../base/views/CircleProgress';
import Title from '../base/views/Title';
import { ChangeEvent, useEffect, useState } from 'react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { token } = await window.auth.login({ email, password, remember });
    setIsLoading(false);
    if (token) {
      navigate('/home');
    }
  };

  useEffect(() => {
    window.auth.getUserData().then((userData) => {
      setEmail(userData.email);
      setPassword(userData.password);
      setRemember(userData.remember);
    });
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: '12px',
      }}
    >
      <Title>WORKFAIR</Title>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          width: '80%',
        }}
      >
        <TextField
          type="text"
          placeholder="이메일"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <TextField
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'flex-start',
            gap: '8px',
          }}
        >
          <input
            type="checkbox"
            checked={remember}
            onChange={() => setRemember(!remember)}
            id="remember"
          />
          <label
            htmlFor="remember"
            style={{
              fontSize: '14px',
              color: '#333',
            }}
          >
            로그인 상태 유지
          </label>
        </div>
        <RoundedFillButton type="submit" disabled={isLoading}>
          {isLoading ? <CircleProgress height={16} /> : '로그인'}
        </RoundedFillButton>
      </form>
    </div>
  );
}
