import { Dispatch, createContext } from "react";
import type {
  I_LayoutReducerStates,
  T_LayoutReducerActions,
} from "../reducers/layout-reducer";
import type {
  I_ModalReducerStates,
  T_ModalReducerActions,
} from "../reducers/modal-reducer";

export const MainContext = createContext<
  | {
      states: I_LayoutReducerStates;
      dispatch: Dispatch<T_LayoutReducerActions>;
    }
  | undefined
>(undefined);

export const ModalContext = createContext<
  | { states: I_ModalReducerStates; dispatch: Dispatch<T_ModalReducerActions> }
  | undefined
>(undefined);
