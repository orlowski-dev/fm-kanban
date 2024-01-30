interface I_ReducerStates {
  btnLoading: boolean;
  formState: "neutral" | "error" | "success";
  formErrorMessage: undefined | null | string;
}

type T_ReducerActions = {
  name: "setLoading" | "setNeutral" | "setError" | "setSuccess";
  payload?: { formErrorMessage: null | string };
};

const formReducer = (
  states: I_ReducerStates,
  action: T_ReducerActions
): I_ReducerStates => {
  switch (action.name) {
    case "setNeutral":
      return {
        btnLoading: false,
        formState: "neutral",
        formErrorMessage: null,
      };
    case "setError":
      return {
        btnLoading: false,
        formState: "error",
        formErrorMessage:
          action.payload?.formErrorMessage ??
          "Something went wrong. Try again.",
      };
    case "setSuccess":
      return {
        btnLoading: false,
        formState: "success",
        formErrorMessage: null,
      };
    case "setLoading":
      return { btnLoading: true, formState: "neutral", formErrorMessage: null };

    default:
      throw new Error("Unknown reducer action name!");
  }
};

export default formReducer;
