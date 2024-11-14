import { DUMMY_USER } from '../../dummy/dummyUser';
import { IToken } from '../../interface';

export default async function requestLogin(
  email: string,
  password: string
): Promise<IToken> {
  if (email !== DUMMY_USER.email || password !== DUMMY_USER.password) {
    return { token: null, error: '이메일 또는 비밀번호가 올바르지 않습니다.' };
  }

  return { token: DUMMY_USER.token, error: null };
}
