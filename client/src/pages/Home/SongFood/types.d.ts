export interface SongFoodProps {
  type: string;
  song?: string;
  food?: string;
  updateDay: (updateParams: UpdateDayProps) => Promise<void>;
}
