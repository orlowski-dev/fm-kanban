export interface I_BoardModel {
  _id: string;
  name: string;
  author: string;
  slug: string;
}

export interface I_ColumnSubtask {
  _id?: string;
  title: string;
  isCompleted: boolean;
}

export interface I_ColumnTask {
  _id: string;
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
