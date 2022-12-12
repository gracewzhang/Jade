export interface Day {
  id: string;
  user_id: string;
  date: string;
  title: string;
  entry: string;
  thoughts: string[];
  photos: string[];
  is_favorite: boolean;
}

export interface DayResult {
  message: string;
  success: boolean;
  result: Day[];
}
