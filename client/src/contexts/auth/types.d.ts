export interface AuthContextProps {
  user: User | undefined;
  setUser: (newUser: User) => void;
  checkIfNewUser: (data: User) => Promise<boolean>;
  signIn: (data: User) => Promise<void>;
  signUp: (data: User) => Promise<void>;
  signOut: () => void;
}
