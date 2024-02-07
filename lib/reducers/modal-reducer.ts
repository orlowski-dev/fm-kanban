import type { ReactElement } from "react";
import type Modal from "@/components/modal";

export type T_ModalSignalTypes = "close";

export interface I_ModalReducerStates {
  modal: ReactElement<typeof Modal> | null;
  signal: T_ModalSignalTypes | null;
}

type T_SetModalActions = {
  type: "setModal";
  payload: ReactElement<typeof Modal> | null;
};

type T_SetSignalActions = {
  type: "setSignal";
  payload: T_ModalSignalTypes | null;
};

export type T_ModalReducerActions = T_SetModalActions | T_SetSignalActions;

const modalReducer = (
  states: I_ModalReducerStates,
  action: T_ModalReducerActions
): I_ModalReducerStates => {
  switch (action.type) {
    case "setModal":
      if (action.payload !== null) {
        return { ...states, modal: action.payload, signal: null };
      }
      return { ...states, modal: null };
    case "setSignal":
      return { ...states, signal: action.payload };
    default:
      throw new Error("Unknown reducer action.");
  }
};

export default modalReducer;
