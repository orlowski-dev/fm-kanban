"use client";

import { I_Task } from "@/lib/models/Task";
import { FormControl, Label } from "../form-control";
import Input from "../input";
import { useContext, useReducer, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import formReducer from "@/lib/reducers/form-reducer";
import Textarea from "../textarea";
import Select from "../select";
import { MainContext, ModalContext } from "@/lib/contexts";
import { Button } from "../button";
import { I_Subtask } from "@/lib/models/Subtask";
import { HiPlus, HiX } from "react-icons/hi";
import { saveData } from "@/lib/server-actions/simple-actions";
import Alert from "../alert";

export interface I_TaskFormProps {
  action: "create" | "update";
  task?: I_Task;
}

interface I_Inputs {
  _id: string;
  title: string;
  description: string;
  //column: string;
  subtasks: { [key: string]: string };
}

const TaskForm = ({ action, task }: I_TaskFormProps) => {
  if (action === "update" && !task) {
    throw new Error(
      "Task prop cannot be empty when action is set to 'upadate'."
    );
  }
  const mainContext = useContext(MainContext);
  const modalContext = useContext(ModalContext);

  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
  } = useForm<I_Inputs>({ mode: "onChange" });
  const [subtasksInputs, setSubtasksInputs] = useState<
    { id: string; value: string; placeholder?: string }[]
  >(() => {
    if (task && task.subtasks.length > 0) {
      return task.subtasks.map((subtask, index: number) => ({
        id: String(index),
        value: subtask.title,
      }));
    }
    return [
      { id: "0", placeholder: "e.g. Make coffee", value: "" },
      { id: "1", placeholder: "e.g. Drink coffee & smile", value: "" },
    ];
  });

  const selectRef = useRef<HTMLInputElement>(null);

  const [formStates, formDispatch] = useReducer(formReducer, {
    btnLoading: false,
    formState: "neutral",
    formErrorMessage: undefined,
  });

  const onSubmit: SubmitHandler<I_Inputs> = async (data) => {
    action === "create" ? saveNew(data) : undefined;
  };

  const saveNew: SubmitHandler<I_Inputs> = async (data) => {
    formDispatch({ name: "setLoading" });
    const subtasks: I_Subtask[] = [];
    console.log(selectRef.current?.value);

    if (!selectRef.current?.value) {
      console.log("Select ref is null.");
      return;
    }

    if (data?.subtasks) {
      for (const k in Object.keys(data.subtasks)) {
        subtasks.push({ title: data.subtasks[k], isCompleted: false });
      }
    }

    const newTask: Omit<I_Task, "_id"> = {
      title: data.title,
      description: data.description.length > 0 ? data.description : null,
      subtasks: subtasks,
      column: selectRef.current.value,
    };

    const res = await saveData("tasks", [newTask]);

    if (res.status !== 201 || !res.data?.insertedIds) {
      formDispatch({
        name: "setError",
        payload: {
          formErrorMessage: "Unable to create a new task. Try again.",
        },
      });
      return;
    }

    mainContext?.dispatch({
      type: "addTask",
      payload: { ...newTask, _id: res.data.insertedIds[0] },
    });
    modalContext?.dispatch({ type: "setSignal", payload: "close" });
  };

  const removeSubtaskInput = (id: string) => {
    setSubtasksInputs(subtasksInputs.filter((input) => input.id !== id));
    unregister(`subtasks.${id}`);
  };

  const addSubtaskInput = () => {
    if (subtasksInputs.length === 0) {
      setSubtasksInputs([{ id: "0", value: "" }]);
      return;
    }

    setSubtasksInputs([
      ...subtasksInputs,
      {
        id: String(subtasksInputs.length + 1),
        placeholder: "Subtask title",
        value: "",
      },
    ]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      {formStates.formState === "error" ? (
        <Alert
          title="Unable to create a new task."
          detail={formStates.formErrorMessage ?? "Unknown error. Try again."}
          type="error"
          icon
        />
      ) : undefined}
      <FormControl
        labelText="Title"
        helpText={errors.title?.message}
        error={Boolean(errors.title?.message)}
      >
        <Input
          {...register("title", { required: "This field is required" })}
          placeholder="e.g. Take coffee break"
          defaultValue={task?.title ?? undefined}
        />
      </FormControl>
      <FormControl
        labelText="Description"
        helpText={errors.description?.message}
        error={Boolean(errors.description?.message)}
      >
        <Textarea
          {...register("description")}
          placeholder="e.g. It's always good to take a break. This 15 minute  break will recharge the batteries a little."
          defaultValue={task?.description ?? undefined}
        />
      </FormControl>
      <div className="grid gap-3">
        <Label text="Subtasks" />
        {subtasksInputs.map((input) => (
          <FormControl
            key={input.id}
            helpText={
              errors.subtasks && errors.subtasks[input.id]
                ? errors.subtasks[input.id]?.message
                : undefined
            }
            error={Boolean(
              errors.subtasks && errors.subtasks[input.id]
                ? errors.subtasks[input.id]?.message
                : undefined
            )}
          >
            <div className="flex gap-1 items-center">
              <Input
                id={input.id}
                {...register(`subtasks.${input.id}`, {
                  required: "This field is required",
                })}
                placeholder={input?.placeholder ?? undefined}
                defaultValue={input.value}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeSubtaskInput(input.id)}
              >
                <HiX />
              </Button>
            </div>
          </FormControl>
        ))}
        <Button
          type="button"
          startIcon={<HiPlus />}
          variant="secondary"
          onClick={addSubtaskInput}
        >
          Add New Subtask
        </Button>
      </div>
      {mainContext?.states.columns ? (
        <FormControl labelText="Status">
          <Select
            options={mainContext.states.columns.map((column) => ({
              key: column._id,
              value: column.name,
            }))}
            defaultSelected={task?.column ?? undefined}
            ref={selectRef}
          />
        </FormControl>
      ) : undefined}
      <Button loading={formStates.btnLoading}>
        {action === "create" ? "Create Task" : "Save Task"}
      </Button>
    </form>
  );
};

export default TaskForm;
