"use client";

import { Button } from "@/components/button";
import { FormControl } from "@/components/form-control";
import { saveData } from "@/lib/server-actions/simple-actions";
import { useReducer, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "@/components/input";
import Modal from "@/components/modal";
import formReducer from "@/lib/reducers/form-reducer";
import { getSession } from "next-auth/react";

export interface I_CreateBoardModalProps {
  onClose: () => void;
  callback?: (boardID: string) => void;
}

interface I_Inputs {
  boardName: string;
}

const CreateBoardModal = ({ onClose, callback }: I_CreateBoardModalProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [formStates, formDispatch] = useReducer(formReducer, {
    btnLoading: false,
    formState: "neutral",
    formErrorMessage: undefined,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<I_Inputs>({ mode: "onChange" });

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(onClose, 101);
  };

  const onSubmit: SubmitHandler<I_Inputs> = async (data) => {
    formDispatch({ name: "setLoading" });
    const session = await getSession();
    const uid = session!.user._id;

    const res = (await saveData("boards", [
      {
        name: data.boardName.trim(),
        author: uid,
      },
    ])) as Omit<I_ServerActionResponse, "data"> & {
      data?: { insertedIds: { [key: number]: string } };
    };

    if (res.status !== 201 || !res.data) {
      formDispatch({
        name: "setError",
        payload: {
          formErrorMessage:
            res.detail ?? "Unable to create a new board. Try again.",
        },
      });
      return;
    }

    const newId = res.data.insertedIds[0];

    if (!newId) {
      formDispatch({
        name: "setError",
        payload: { formErrorMessage: "Failed. Try again." },
      });
      return;
    }

    formDispatch({ name: "setSuccess" });
    callback && callback(newId);
    closeModal();
  };

  return (
    <Modal isOpen={isOpen}>
      <section className="grid gap-6">
        <header>
          <h2 className="text-hmd">Creat new board</h2>
          <button onClick={closeModal}>close</button>
        </header>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
          <FormControl
            labelText="Board name"
            helpText={errors.boardName?.message}
            error={Boolean(errors.boardName?.message)}
          >
            <Input
              {...register("boardName", {
                required: "This field is required.",
                pattern: {
                  value: /^[^\d!@#$%^&*()_+={}[\]:;<>,.?/~`\\|-]*$/,
                  message:
                    "Name can only consist of words separated by a space.",
                },
              })}
            />
          </FormControl>
          <div className="flex justify-end gap-3">
            <span
              role="button"
              className="text-medium-grey px-3 py-2 cursor-pointer select-none"
            ></span>
            <Button role="submit" loading={formStates.btnLoading}>
              Create
            </Button>
          </div>
        </form>
      </section>
    </Modal>
  );
};

export default CreateBoardModal;
