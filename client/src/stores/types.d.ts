import { User } from '../types/user';

export interface StoreResults {
  user: undefined | User;
  setUser: (newUser: User) => void;
  checkIfNewUser: (googleId: string) => Promise<boolean>;
  signIn: (data: User) => Promise<void>;
  signUp: (data: User) => Promise<void>;
  signOut: () => void;
  updateUser: (props: UpdateUserProps) => Promise<void>;
}

export interface UpdateUserProps {
  googleId: string;
  newName: string;
  newPrimaryColor: string;
  newSecondaryColor: string;
}
