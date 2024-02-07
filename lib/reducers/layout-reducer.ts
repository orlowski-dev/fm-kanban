import type { I_BoardModel } from "../models/Board";
import type { I_Column } from "../models/Column";
import type { I_Task } from "../models/Task";

export interface I_LayoutReducerStates {
  refreshBoards: boolean;
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

type T_AddToArrayOfObjects = {
  type: "addBoard" | "addColumn";
  payload: Object;
};

type T_SetBooleanAction = {
  type: "setRefreshBoards";
  payload: boolean;
};

export type T_LayoutReducerActions =
  | T_BoardsActions
  | T_SidebardVisibilityActions
  | T_ColumnsAndTasksActions
  | T_CurrentBoardActions
  | T_AddToArrayOfObjects
  | T_SetBooleanAction;

const addToArray = <T>(elem: T, array: T[] | null) => {
  return !array || array?.length === 0 ? [elem] : [...array, elem];
};

const layoutReducer = (
  states: I_LayoutReducerStates,
  action: T_LayoutReducerActions
): I_LayoutReducerStates => {
  switch (action.type) {
    case "setRefreshBoards":
      return { ...states, refreshBoards: action.payload };
    case "setBoards":
      return { ...states, boards: action.payload, refreshBoards: false };
    case "setIsSidebarVisible":
      return { ...states, isSidebarVisible: action.payload };
    case "setColumnsAndTasks":
      return {
        ...states,
        columns: action.payload.columns ?? null,
        tasks: action.payload.tasks ?? null,
      };
    case "addBoard":
      const newBoard = action.payload as I_BoardModel;
      return { ...states, boards: addToArray(newBoard, states.boards) };
    // if (!states.boards || states.boards?.length === 0) {
    //   return { ...states, boards: [action.payload as I_BoardModel] };
    // }

    // return {
    //   ...states,
    //   boards: [...states.boards, action.payload as I_BoardModel],
    // };
    case "addColumn":
      const newColumn = action.payload as I_Column;
      return {
        ...states,
        columns: addToArray(newColumn, states.columns),
      };
    case "setCurrentBoard":
      return { ...states, currentBoardId: action.payload };
    default:
      throw new Error("Unknown reduder action");
  }
};

export default layoutReducer;
