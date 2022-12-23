export interface Day {
  user_id: string;
  date: string;
  title: string;
  entry: string;
  thoughts: string[];
  photos: string[];
  is_favorite: boolean;
}

export interface GetDaysResults {
  message: string;
  success: boolean;
  result: Day[];
}

export interface GetDayResults {
  message: string;
  success: boolean;
  result: Day;
}
