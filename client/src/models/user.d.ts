export interface User {
  google_id: string;
  email: string;
  name: string;
  image: string;
  created_at: Date;
}

export interface DecodedUser {
  email: string;
  email_verified: boolean;
  sub: string;
  name: string;
  picture: string;
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
