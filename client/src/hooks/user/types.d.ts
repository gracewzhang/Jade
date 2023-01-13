import { User } from '../../types/user';

export interface UseUserResults {
  getUser: (props: GetUserProps) => Promise<GetUserResults>;
  getNumberOfDays: (
    props: GetNumberOfDaysProps
  ) => Promise<GetNumberOfDaysResults>;
  editUser: (props: EditUserProps) => Promise<void>;
}

export interface GetUserProps {
  googleId: string;
}

export interface GetUserResults {
  message: string;
  success: boolean;
  result: User | undefined;
}

export interface GetNumberOfDaysProps {
  googleId: string;
}

export interface GetNumberOfDaysResults {
  message: string;
  success: boolean;
  result: number | undefined;
}

export interface EditUserProps {
  googleId: string;
  newName: string;
  newPrimaryColor: string;
  newSecondaryColor: string;
}
