export interface PhotosProps {
  date: string;
  photos: string[];
}

export interface PhotoProps {
  idx: number;
  googleId: string | undefined;
  date: string;
  photo: string;
}
