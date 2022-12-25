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
