export interface UseDayResults {
  getDayExists: (props: GetDayExistsProps) => Promise<GetDayExistsResults>;
  getDay: (props: GetDayProps) => Promise<GetDayResults>;
  getDaysDay: (props: GetDayMonthDayProps) => Promise<GetDayMonthDayResults>;
  createDay: (props: CreateDayProps) => Promise<CreateDayResults>;
  editDay: (props: EditDayProps) => Promise<EditDayResults>;
  getFavorites: (props: GetFavoritesProps) => Promise<GetFavoritesResults>;
}

export interface GetDayExistsProps {
  googleId: string;
  date: string;
}

export interface DayExistsSuccess {
  _id: string;
}

export interface GetDayExistsResults {
  message: string;
  success: boolean;
  result: DayExistsSuccess | boolean;
}

export interface GetDayProps {
  dayId: string;
}

export interface GetDayResults {
  message: string;
  success: boolean;
  result: Day;
}

export interface GetDaysDayProps {
  googleId: string;
  day: string;
}

export interface GetDaysDayResults {
  message: string;
  success: boolean;
  result: Array<LeanDocument<Day>>;
}

export interface CreateDayProps {
  google_id: string;
  date: string;
}

export interface CreateDayResults {
  message: string;
  success: boolean;
  result: Day;
}

export interface EditDayProps {
  _id: string;
  title?: string;
  entry?: string;
  song?: string;
  food?: string;
  thoughts?: string[];
  photos?: string[];
  is_favorite?: boolean;
}

export interface EditDayResults {
  message: string;
  success: boolean;
  result: Day;
}

export interface GetFavoritesProps {
  googleId: string;
}

export interface GetFavoritesResults {
  message: string;
  success: boolean;
  result: Array<LeanDocument<Day>>;
}
