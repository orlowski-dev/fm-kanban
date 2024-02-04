"use client";

import { Button, IconButton } from "@/components/button";
import { HiDotsVertical } from "react-icons/hi";
import { HiTrash } from "react-icons/hi";
import { I_Task } from "@/lib/models/Task";
import { I_Column } from "@/lib/models/Column";
import Dropdown from "@/components/dropdown";
import Checkbox from "@/components/checkbox";
import Select from "@/components/select";
import Modal from "@/components/modal";
import { useState } from "react";

export interface I_TaskDetailModalProps {
  task?: I_Task;
  columns: I_Column[];
  currentColumn: string;
  onClose: () => void;
  callback?: () => void;
}

const TaskDetailModal = ({
  task,
  columns,
  currentColumn,
  onClose,
  callback,
}: I_TaskDetailModalProps) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!task) {
    return <p>Unable to load task detail.</p>;
  }

  const subtasks = task.subtasks;
  const subtasksLength = subtasks?.length;

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(onClose, 101);
  };

  const onSubtaskChange = () => {};

  return (
    <Modal isOpen={isOpen}>
      <section className="grid gap-3">
        <header className="flex items-baseline justify-between gap-3">
          <h2 className="text-hmd">{task.title}</h2>
          <Dropdown
            position="right"
            offset
            controlElement={
              <IconButton title="More" variant="ghost">
                <HiDotsVertical />
              </IconButton>
            }
          >
            <div className="grid gap-3 p-3">
              <ul>
                <li role="button">
                  <HiTrash /> Remove task
                </li>
              </ul>
            </div>
          </Dropdown>
        </header>
        <article className="grid gap-3">
          {task?.description && (
            <p className="text-body text-medium-grey">{task.description}</p>
          )}
          {subtasksLength && subtasksLength > 0 ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("submit");
                callback && callback();
              }}
            >
              <p className="text-bodysm">
                Subtasks ({subtasks?.filter((s) => s.isCompleted).length ?? 0}{" "}
                of {subtasksLength})
              </p>
              <div className="grid gap-2 mt-3">
                {subtasks.map((subtask, index: number) => (
                  <Checkbox
                    key={index}
                    label={subtask.title}
                    defaultChecked={subtask.isCompleted}
                    onChange={(e) => {}}
                  />
                ))}
              </div>
              <div className="mt-6">
                <Select
                  defaultSelected={currentColumn}
                  options={columns.map((column) => ({
                    key: column._id,
                    value: column.name,
                  }))}
                />
              </div>
              <div className="mt-6 flex items-center justify-end gap-3">
                <span
                  role="button"
                  className="text-medium-grey text-bodysm px-3 py-2 cursor-pointer select-none"
                  onClick={closeModal}
                >
                  Cancel
                </span>
                <Button role="submit">Save</Button>
              </div>
            </form>
          ) : undefined}
        </article>
      </section>
    </Modal>
  );
};

export default TaskDetailModal;
