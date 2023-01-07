import { User } from '../../types/user';

export interface UseAuthResults {
  user: undefined | User;
  setUser: (newUser: User) => void;
  checkIfNewUser: (data: User) => Promise<boolean>;
  signIn: (data: User) => Promise<void>;
  signUp: (data: User) => Promise<void>;
  signOut: () => void;
}
