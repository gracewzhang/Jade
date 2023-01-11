export interface PhotosProps {
  date: string;
  photos: string[];
  updateDay: (updateParams: UpdateDayProps) => Promise<void>;
}

export interface PhotoProps {
  idx: number;
  googleId: string | undefined;
  primaryColor: string;
  date: string;
  photos: string[];
  updateDay: (updateParams: UpdateDayProps) => Promise<void>;
}

export interface StyledPlusIconProps {
  primarycolor: string;
}
