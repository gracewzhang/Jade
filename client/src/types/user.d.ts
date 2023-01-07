export interface User {
  google_id: string;
  email: string;
  name: string;
  image: string;
  created_at: Date;
  primary_color: string;
  secondary_color: string;
}

export interface AuthUser {
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
