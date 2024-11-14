import { DUMMY_USER_PROFILE } from '../../dummy/dummyUser';

export default async function getUserProfile(token: string) {
  return DUMMY_USER_PROFILE;
}
