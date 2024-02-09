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
  type: "addBoard" | "addColumn" | "addTask";
  payload: Object;
};

type T_SetBooleanAction = {
  type: "setRefreshBoards";
  payload: boolean;
};

type T_UpdateObjectInArray = {
  type: "updateTask";
  payload: { old: Object; new: Object };
};

type T_RemoveObjFromArray = {
  type: "removeTask";
  objId: string;
};

export type T_LayoutReducerActions =
  | T_BoardsActions
  | T_SidebardVisibilityActions
  | T_ColumnsAndTasksActions
  | T_CurrentBoardActions
  | T_AddToArrayOfObjects
  | T_SetBooleanAction
  | T_UpdateObjectInArray
  | T_RemoveObjFromArray;

const addToArray = <T>(elem: T, array: T[] | null) => {
  return !array || array?.length === 0 ? [elem] : [...array, elem];
};

const updateObjInArr = <T>(payload: { old: T; new: T }, arr: T[] | null) => {
  if (!arr || arr?.length === 0) {
    throw new Error("Array of objects is empty");
  }
  const temp = arr.find((arrObj) => arrObj === payload.old);
  if (!temp) {
    throw new Error("Object was not found in an array of objects.");
  }

  const index = arr.indexOf(temp);
  const newArr = [...arr];

  newArr[index] = payload.new;
  return newArr;
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
        refreshBoards: false,
      };
    case "addBoard":
      const newBoard = action.payload as I_BoardModel;
      return { ...states, boards: addToArray(newBoard, states.boards) };
    case "addColumn":
      const newColumn = action.payload as I_Column;
      return {
        ...states,
        columns: addToArray(newColumn, states.columns),
      };
    case "addTask":
      const newTask = action.payload as I_Task;
      return { ...states, tasks: addToArray(newTask, states.tasks) };
    case "setCurrentBoard":
      return { ...states, currentBoardId: action.payload };
    case "updateTask":
      const newTaskPl = action.payload as { old: I_Task; new: I_Task };
      return {
        ...states,
        tasks: updateObjInArr(newTaskPl, states.tasks),
      };
    case "removeTask":
      return {
        ...states,
        tasks:
          states.tasks?.filter((task) => task._id !== action.objId) ?? null,
      };
    default:
      throw new Error("Unknown reduder action");
  }
};

export default layoutReducer;
