export interface ThoughtsProps {
  updateDay: (updateParams: UpdateDayProps) => Promise<void>;
  thoughts: string[];
}

export interface ThoughtProps {
  idx: number;
  thoughts: string[];
  setThoughts: React.Dispatch<React.SetStateAction<string[]>>;
}
