import { AuthUser } from '../../types/user';

export interface UseAuthResults {
  checkIfNewUser: (googleId: string) => Promise<boolean>;
  signIn: (data: AuthUser) => Promise<void>;
  signUp: (data: AuthUser) => Promise<void>;
  signOut: () => void;
}
