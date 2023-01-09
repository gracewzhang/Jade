import { AuthUser, User } from '../types/user';

export interface StoreResults {
  user: undefined | User;
  setUser: (newUser: User) => void;
  checkIfNewUser: (googleId: string) => Promise<boolean>;
  signIn: (data: AuthUser) => Promise<void>;
  signUp: (data: AuthUser) => Promise<void>;
  signOut: () => void;
  updateUser: (props: UpdateUserProps) => Promise<void>;
}

export interface UpdateUserProps {
  googleId: string;
  newName: string;
  newPrimaryColor: string;
  newSecondaryColor: string;
}
