export type ActivityLevel = 0 | 1 | 2 | 3 | 4;

export interface DailyActivity {
  date: string;
  level: ActivityLevel;
}
