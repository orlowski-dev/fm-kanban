export interface I_Task {
  _id: string;
  column: string;
  title: string;
  description: string | null;
  subtasks: {
    title: string;
    isCompleted: boolean;
  }[];
}
