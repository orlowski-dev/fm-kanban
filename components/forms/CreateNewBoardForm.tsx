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

interface I_Inputs {
  boardName: string;
}

interface I_CreateNewBoardFormProps {}

const CreateNewBoardForm = ({}: I_CreateNewBoardFormProps) => {
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
    if (!uid) {
      console.log("no uid");
      formDispatch({ name: "setError" });
      return;
    }
    const tempBoard = { name: data.boardName.trim(), author: uid };

    const res = await saveData("boards", [tempBoard]);

    if (res.status !== 201 || !res.data?.insertedIds[0]) {
      formDispatch({
        name: "setError",
        payload: {
          formErrorMessage:
            res.errorMessage ?? "Unable to save a new board. Try again.",
        },
      });
      return;
    }

    mainContext?.dispatch({
      type: "addBoard",
      payload: { ...tempBoard, _id: res.data.insertedIds[0] },
    });
    modalContext?.dispatch({ type: "setSignal", payload: "close" });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      {formStates.formState === "error" ? (
        <Alert
          title="Unable to create a new board."
          detail={formStates.formErrorMessage ?? "Unknown error. Try again."}
          type="error"
          icon
        />
      ) : undefined}
      <FormControl
        labelText="Board name"
        helpText={errors.boardName?.message}
        error={Boolean(errors.boardName?.message)}
      >
        <Input
          {...register("boardName", {
            required: "This field is required",
            pattern: {
              value: /^[^\d!@#$%^&*()_+={}[\]:;<>,.?/~`\\|-]{3,32}$/,
              message: "Enter a valid board name.",
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

export default CreateNewBoardForm;
