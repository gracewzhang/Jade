export interface UseAuthReturn {
  user: null;
  signIn: (data: NewUser) => Promise<void>;
  signUp: (data: NewUser) => Promise<void>;
  signOut: () => void;
}
