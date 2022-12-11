export interface User {
  id: string;
  google_id: string;
  name: string;
  image: string;
  created_at: Date;
}

export interface NewUser {
  google_id: string;
  name: string;
  image: string;
  created_at: Date;
}

// API Results

export interface GetUsersResult {
  message: string;
  success: boolean;
  result: User[];
}

export interface PostUserResult {
  message: string;
  success: boolean;
  result: User;
}
