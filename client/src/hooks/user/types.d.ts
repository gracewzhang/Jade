import { User } from '../../types/user';

export interface UseUserResults {
  getUser: (props: GetUserProps) => Promise<GetUserResults>;
}

export interface GetUserProps {
  googleId: string;
}

export interface GetUserResults {
  message: string;
  success: boolean;
  result: User | undefined;
}
