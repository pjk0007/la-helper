import fs from 'fs';
import path from 'path';
import { IUserData } from '../interface';

export function existsUserData(): boolean {
  return fs.existsSync(path.join(__dirname, 'data.json'));
}

export function getUserData(): IUserData {
  if (!existsUserData()) return { email: '', password: '', remember: false };
  const data = fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8');
  return JSON.parse(data);
}

export function setUserData(userData: IUserData) {
  fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(userData));
}

export function deleteUserData() {
  if (existsUserData()) fs.unlinkSync(path.join(__dirname, 'data.json'));
}
