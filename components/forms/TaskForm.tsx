"use client";

import { I_Task } from "@/lib/models/Task";
import { FormControl, Label } from "../form-control";
import Input from "../input";
import { useContext, useId, useReducer, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import formReducer from "@/lib/reducers/form-reducer";
import Textarea from "../textarea";
import Select from "../select";
import { MainContext, ModalContext } from "@/lib/contexts";
import { Button } from "../button";
import { I_Subtask } from "@/lib/models/Subtask";
import { HiPlus, HiX } from "react-icons/hi";
import { saveData, updateDocument } from "@/lib/server-actions/simple-actions";
import Alert from "../alert";
import uniqid from "uniqid";

export interface I_TaskFormProps {
  action: "create" | "update";
  task?: I_Task;
}

interface I_Inputs {
  _id: string;
  title: string;
  description: string;
  subtasks: { [key: string]: string };
}

const makeSubtasksArr = (data: { [key: string]: string }) => {
  const subtasks: I_Subtask[] = [];

  Object.keys(data).forEach((key) => {
    subtasks.push({ title: data[key], isCompleted: false });
  });

  return subtasks;
};

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
      { id: uniqid(), placeholder: "e.g. Make coffee", value: "" },
      { id: uniqid(), placeholder: "e.g. Drink coffee & smile", value: "" },
    ];
  });

  const selectRef = useRef<HTMLInputElement>(null);

  const [formStates, formDispatch] = useReducer(formReducer, {
    btnLoading: false,
    formState: "neutral",
    formErrorMessage: undefined,
  });

  const onSubmit: SubmitHandler<I_Inputs> = async (data) => {
    action === "create" ? saveNew(data) : updateTask(data);
  };

  const saveNew: SubmitHandler<I_Inputs> = async (data) => {
    if (!selectRef.current?.value) {
      console.log("Select ref is null.");
      return;
    }

    formDispatch({ name: "setLoading" });
    const subtasks: I_Subtask[] = makeSubtasksArr(data.subtasks);

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

  const updateTask: SubmitHandler<I_Inputs> = async (data) => {
    if (!selectRef.current || !task) return;
    const subtasks = makeSubtasksArr(data.subtasks);
    const { _id, ...oldTask } = task;

    // _id cannot be passed when coll.updateOne
    const newTask: Omit<I_Task, "_id"> = {
      ...oldTask,
      column: selectRef.current.value,
      subtasks: subtasks,
      title: data.title,
      description: data.description,
    };

    const res = await updateDocument("tasks", task._id, newTask);

    if (res.status !== 200) {
      formDispatch({
        name: "setError",
        payload: {
          formErrorMessage: res.errorMessage ?? "Unknown error. Try again.",
        },
      });
      return;
    }

    // remebmer to add missing _id!!!
    mainContext?.dispatch({
      type: "updateTask",
      payload: { old: task, new: { ...newTask, _id: _id } },
    });
    modalContext?.dispatch({ type: "setSignal", payload: "close" });
  };

  const removeSubtaskInput = (id: string) => {
    setSubtasksInputs(subtasksInputs.filter((input) => input.id !== id));
    unregister(`subtasks.${id}`);
  };

  const addSubtaskInput = () => {
    if (subtasksInputs.length === 0) {
      setSubtasksInputs([
        { id: uniqid(), value: "", placeholder: "Subtask title" },
      ]);
      return;
    }

    setSubtasksInputs([
      ...subtasksInputs,
      {
        id: uniqid(),
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
          details={formStates.formErrorMessage ?? "Unknown error. Try again."}
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
        <div className="grid gap-2">
          {subtasksInputs.map((input, index: number) => (
            <FormControl
              key={index}
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
                {index !== 0 ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSubtaskInput(input.id)}
                  >
                    <HiX />
                  </Button>
                ) : null}
              </div>
            </FormControl>
          ))}
        </div>
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
