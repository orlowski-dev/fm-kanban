"use client";

import { I_Task } from "@/lib/models/Task";
import {
  FormEvent,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { FormControl, Label } from "../form-control";
import { Button } from "../button";
import { MainContext, ModalContext } from "@/lib/contexts";
import { updateDocument } from "@/lib/server-actions/simple-actions";
import Checkbox from "../checkbox";
import formReducer from "@/lib/reducers/form-reducer";
import Alert from "../alert";
import Select from "../select";

export interface I_TaskDetailsFormProps {
  task: I_Task;
}

const TaskDetailsForm = ({ task }: I_TaskDetailsFormProps) => {
  const [formStates, formDispatch] = useReducer(formReducer, {
    btnLoading: false,
    formState: "neutral",
    formErrorMessage: undefined,
  });
  const [tempSubtasks, setTempSubtasks] = useState([...task.subtasks]);

  useEffect(() => {
    setCompleted(tempSubtasks.filter((subtask) => subtask.isCompleted).length);
  }, [tempSubtasks]);

  const [completed, setCompleted] = useState(0);
  const mainContext = useContext(MainContext);
  const modalContext = useContext(ModalContext);
  const selectRef = useRef<HTMLInputElement>(null);

  if (!mainContext?.states || !mainContext.states.columns) return;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectRef.current) return;

    formDispatch({ name: "setLoading" });

    const newTask = task;
    newTask.subtasks = tempSubtasks;
    newTask.column = selectRef.current.value;

    const res = await updateDocument("tasks", task._id, {
      subtasks: tempSubtasks,
      column: selectRef.current.value,
    });

    if (res.status !== 200) {
      formDispatch({
        name: "setError",
        payload: {
          formErrorMessage: res.details ?? "Unknown error. Try again.",
        },
      });
      return;
    }

    mainContext.dispatch({
      type: "updateTask",
      payload: { old: task, new: newTask },
    });
    modalContext?.dispatch({ type: "setSignal", payload: "close" });
  };

  return (
    <section className="grid gap-4">
      <h2 className="text-hlg">{task.title}</h2>
      {task.description ? (
        <p className="text-body text-medium-grey">{task.description}</p>
      ) : null}
      <form onSubmit={onSubmit} className="grid gap-4">
        {formStates.formState === "error" ? (
          <Alert
            title="Unable to update the task."
            details={formStates.formErrorMessage ?? "Unknown error. Try again."}
            type="error"
            icon
          />
        ) : undefined}

        <div className="mt-3 grid gap-1">
          <div className="mb-2">
            <Label text={`Subtasks (${completed} of ${tempSubtasks.length})`} />
          </div>
          {tempSubtasks.map((subtask, index: number) => (
            <Checkbox
              key={index}
              label={subtask.title}
              defaultChecked={subtask.isCompleted}
              onChange={(e) => {
                const index = tempSubtasks.findIndex((s) => s === subtask);
                const temp = [...tempSubtasks];
                temp[index] = { ...subtask, isCompleted: e.target.checked };
                setTempSubtasks([...temp]);
              }}
            />
          ))}
        </div>
        <FormControl labelText="Status">
          <Select
            options={mainContext.states.columns.map((col) => ({
              key: col._id,
              value: col.name,
            }))}
            defaultSelected={task.column}
            ref={selectRef}
          />
        </FormControl>
        <div className="mt-6 flex justify-end">
          <Button loading={formStates.btnLoading}>Save</Button>
        </div>
      </form>
    </section>
  );
};

export default TaskDetailsForm;
