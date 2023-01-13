import { User } from '../types/user';

export interface StoreResults {
  user: undefined | User;
  setUser: (newUser: User | undefined) => void;
}
