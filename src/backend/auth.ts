import changeScreen from '../backend/changeScreen';
import requestLogin from '../backend/apis/requestLogin';
import {
  deleteUserData,
  existsUserData,
  getUserData,
  setUserData,
} from '../backend/storage';
import { IToken, IUserData } from '../interface';
import { BrowserWindow, dialog, screen } from 'electron';

export async function login({
  email,
  password,
  remember,
}: IUserData): Promise<IToken> {
  const window = BrowserWindow.getFocusedWindow();
  const { token, error } = await requestLogin(email, password);
  if (!token) {
    dialog.showMessageBoxSync(window, {
      type: 'error',
      message: '로그인 실패',
      detail: '이메일 또는 비밀번호가 올바르지 않습니다.',
    });
    return { token: null, error };
  }

  if (remember) {
    setUserData({ email, password, remember });
  } else if (!remember) {
    deleteUserData();
  }

  changeScreen('home');

  return { token, error };
}

export async function getLocalUserData() {
  if (existsUserData()) {
    return getUserData();
  }
  return {
    email: '',
    password: '',
  };
}
