export interface EntryProps {
  updateDay: (updateParams: UpdateDayProps) => Promise<void>;
  title: string;
  entry: string;
  isFavorite: boolean;
}
