export interface PhotosProps {
  date: string;
  day: Day;
  setDay: (newDay: Day) => void;
}

export interface PhotoProps {
  idx: number;
  googleId: string | undefined;
  primaryColor: string;
  date: string;
  day: Day;
  setDay: (newDay: Day) => void;
}

export interface StyledPlusIconProps {
  primarycolor: string;
}
