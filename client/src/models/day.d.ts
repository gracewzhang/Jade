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

export interface DayExistsResults {
  message: string;
  success: boolean;
  result: DayExistsSuccess | boolean;
}

export interface DayExistsSuccess {
  _id: string;
}

export interface CreateDayParams {
  google_id: string;
  date: string;
}

export interface CreateDayResults {
  message: string;
  success: boolean;
  result: Day;
}
