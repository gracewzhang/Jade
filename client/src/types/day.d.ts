export interface Day {
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
}

// TODO: clean up where all of these diff types should go T_T
export interface UpdateDayProps {
  title?: string;
  entry?: string;
  song?: string;
  food?: string;
  thoughts?: string[];
  photos?: string[];
  is_favorite?: boolean;
}
