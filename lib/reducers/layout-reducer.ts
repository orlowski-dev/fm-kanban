import { I_BoardModel } from "../models/Board";
import { I_Column } from "../models/Column";
import { I_Task } from "../models/Task";

export interface I_LayoutReducerStates {
  boards: I_BoardModel[] | null;
  currentBoardId: string | null;
  isSidebarVisible: boolean;
  columns: I_Column[] | null;
  tasks: I_Task[] | null;
}

type T_BoardsActions = {
  type: "setBoards";
  payload: I_BoardModel[] | null;
};

type T_SidebardVisibilityActions = {
  type: "setIsSidebarVisible";
  payload: boolean;
};

type T_ColumnsAndTasksActions = {
  type: "setColumnsAndTasks";
  payload: { columns?: I_Column[] | null; tasks?: I_Task[] | null };
};

type T_CurrentBoardActions = {
  type: "setCurrentBoard";
  payload: string | null;
};

export type T_LayoutReducerActions =
  | T_BoardsActions
  | T_SidebardVisibilityActions
  | T_ColumnsAndTasksActions
  | T_CurrentBoardActions;

const layoutReducer = (
  states: I_LayoutReducerStates,
  action: T_LayoutReducerActions
): I_LayoutReducerStates => {
  switch (action.type) {
    case "setBoards":
      return { ...states, boards: action.payload };
    case "setIsSidebarVisible":
      return { ...states, isSidebarVisible: action.payload };
    case "setColumnsAndTasks":
      return {
        ...states,
        columns: action.payload.columns ?? states.columns,
        tasks: action.payload.tasks ?? states.tasks,
      };
    case "setCurrentBoard":
      return { ...states, currentBoardId: action.payload };
    default:
      throw new Error("Unknown reduder action");
  }
};

export default layoutReducer;
