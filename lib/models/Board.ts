export interface I_BoardModel {
  _id: string;
  name: string;
  author: string;
  slug: string;
}

export interface I_ColumnSubtask {
  title: string;
  isCompleted: boolean;
}

export interface I_ColumnTask {
  title: string;
  description?: string;
  status: string;
  subtasks?: I_ColumnSubtask[];
}

export interface I_BoardColumnModel {
  _id: string;
  board: string;
  name: string;
  tasks: I_ColumnTask[];
}
