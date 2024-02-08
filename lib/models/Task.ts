import { I_Subtask } from "./Subtask";

export interface I_Task {
  _id: string;
  column: string;
  title: string;
  description: string | null;
  subtasks: I_Subtask[];
}
