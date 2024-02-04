import { I_Column } from "./Column";
import { I_Task } from "./Task";

export interface I_BoardModel {
  _id: string;
  name: string;
  author: string;
  slug: string;
}

export interface I_ColumnAndTasksMerged extends I_Column {
  tasks: I_Task[];
}
