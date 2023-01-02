export interface FavoritesProps {
  date: string;
  setDate: (newDate: Date) => void;
}

export interface FavoriteProps {
  setDate: (newDate: Date) => void;
  day: Day;
  selected: boolean;
}

export interface FavoriteContainerProps {
  selected: boolean;
}
