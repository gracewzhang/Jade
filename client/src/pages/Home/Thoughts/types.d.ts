import React from 'react';

export interface ThoughtsProps {
  updateDay: (updateParams: UpdateDayProps) => Promise<void>;
  thoughts: string[];
}

export interface ThoughtProps {
  idx: number;
  thoughts: React.MutableRefObject<string[]>;
}
