"use client";

import { type SubmitHandler, useForm } from "react-hook-form";
import { FormControl } from "../form-control";
import Input from "../input";
import { Button } from "../button";
import { useContext, useReducer } from "react";
import formReducer from "@/lib/reducers/form-reducer";
import Alert from "../alert";
import { MainContext, ModalContext } from "@/lib/contexts";
import { getSession } from "next-auth/react";
import { saveData } from "@/lib/server-actions/simple-actions";
import { I_Column } from "@/lib/models/Column";

interface I_Inputs {
  columnName: string;
}

const CreateNewColumnForm = () => {
  const mainContext = useContext(MainContext);
  const modalContext = useContext(ModalContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<I_Inputs>({ mode: "onChange" });

  const [formStates, formDispatch] = useReducer(formReducer, {
    btnLoading: false,
    formState: "neutral",
    formErrorMessage: undefined,
  });

  const onSubmit: SubmitHandler<I_Inputs> = async (data) => {
    formDispatch({ name: "setLoading" });
    const session = await getSession();
    const uid = session?.user._id;
    const boardId = mainContext?.states.currentBoardId;
    if (!boardId) {
      console.log("no current board id");
      formDispatch({ name: "setError" });
      return;
    }
    if (!uid) {
      console.log("no uid");
      formDispatch({ name: "setError" });
      return;
    }
    const tempColumn: Omit<I_Column, "_id"> = {
      name: data.columnName.trim(),
      board: boardId,
    };

    const res = await saveData("columns", [tempColumn]);

    if (res.status !== 201 || !res.data?.insertedIds[0]) {
      formDispatch({
        name: "setError",
        payload: {
          formErrorMessage:
            res.errorMessage ?? "Unable to save a new column. Try again.",
        },
      });
      return;
    }

    mainContext?.dispatch({
      type: "addColumn",
      payload: { ...tempColumn, _id: res.data.insertedIds[0] },
    });
    modalContext?.dispatch({ type: "setSignal", payload: "close" });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
      {formStates.formState === "error" ? (
        <Alert
          title="Unable to create a new column."
          detail={formStates.formErrorMessage ?? "Unknown error. Try again."}
          type="error"
          icon
        />
      ) : undefined}
      <FormControl
        labelText="Board name"
        helpText={errors.columnName?.message}
        error={Boolean(errors.columnName?.message)}
      >
        <Input
          {...register("columnName", {
            required: "This field is required",
            pattern: {
              value: /^[^\d!@#$%^&*()_+={}[\]:;<>,.?/~`\\|-]{3,32}$/,
              message: "Enter a valid column name.",
            },
          })}
        />
      </FormControl>
      <div className="flex items-center justify-end">
        <Button loading={formStates.btnLoading}>Create</Button>
      </div>
    </form>
  );
};

export default CreateNewColumnForm;
