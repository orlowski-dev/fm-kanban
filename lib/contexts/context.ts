import type {
  I_LayoutReducerStates,
  T_LayoutReducerActions,
} from "../reducers/layout-reducer";
import { Dispatch, createContext } from "react";

export const MainContext = createContext<
  | {
      states: I_LayoutReducerStates;
      dispatch: Dispatch<T_LayoutReducerActions>;
    }
  | undefined
>(undefined);
