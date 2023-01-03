export interface PastDay {
  _id: string;
  google_id: string;
  date: string;
  title: string;
  entry: string;
  song: string;
  food: string;
  thoughts: string[];
  photos: string[];
  is_favorite: boolean;
  when: string;
}

export interface OnThisDayProps {
  date: string;
  setDate: (newDate: Date) => void;
}
