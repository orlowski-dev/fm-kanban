"use client";

import {
  DropdownOptionsList,
  DropdownOptionsListItem,
} from "@/components/dropdown";
import TaskDetailsForm from "@/components/forms/TaskDetailsModalForm";
import TaskForm from "@/components/forms/TaskForm";
import Modal, { WarningModal } from "@/components/modal";
import { MainContext, ModalContext } from "@/lib/contexts";
import { I_Task } from "@/lib/models/Task";
import { deleteDocument } from "@/lib/server-actions/simple-actions";
import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import { useCallback, useContext } from "react";
import { HiPencilSquare, HiTrash } from "react-icons/hi2";

interface I_Props {
  tasks: I_Task[];
}
const parentVariant: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const childrenVariant: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const TaskCards = ({ tasks }: I_Props) => {
  const mainContext = useContext(MainContext);
  const modalContext = useContext(ModalContext);

  const removeTask = async (taskId: string) => {
    const res = await deleteDocument("tasks", taskId);
    if (res.status !== 200) {
      return;
    }
    mainContext?.dispatch({ type: "removeTask", objId: taskId });
  };

  return (
    <motion.ul
      className="grid gap-3"
      initial="initial"
      animate="animate"
      variants={parentVariant}
    >
      {tasks.map((task) => (
        <motion.li
          key={task._id}
          variants={childrenVariant}
          className="block px-4 py-6 rounded-md bg-white dark:bg-dark-grey transition-colors shadow-lg cursor-pointer"
          onClick={() =>
            modalContext?.dispatch({
              type: "setModal",
              payload: (
                <Modal
                  title="Task details"
                  optionsList={
                    <DropdownOptionsList>
                      <DropdownOptionsListItem
                        startIcon={<HiPencilSquare />}
                        onClick={() =>
                          modalContext?.dispatch({
                            type: "setModal",
                            payload: (
                              <Modal title="Edit task">
                                <TaskForm task={task} action="update" />
                              </Modal>
                            ),
                          })
                        }
                      >
                        Edit task
                      </DropdownOptionsListItem>
                      <DropdownOptionsListItem
                        variant="danger"
                        startIcon={<HiTrash />}
                        onClick={() =>
                          modalContext.dispatch({
                            type: "setModal",
                            payload: (
                              <Modal>
                                <WarningModal
                                  title="Delete this task?"
                                  description={`Are you sure you want to delete the '${task.title}' task and its subtasks? This action cannot be reversed.`}
                                  confirmOnClick={() => removeTask(task._id)}
                                />
                              </Modal>
                            ),
                          })
                        }
                      >
                        Remove task
                      </DropdownOptionsListItem>
                    </DropdownOptionsList>
                  }
                >
                  <TaskDetailsForm task={task} />
                </Modal>
              ),
            })
          }
        >
          <p className="text-hmd mb-2">{task.title}</p>
          <p className="text-bodysm text-medium-grey">
            {task.subtasks?.filter((subtask) => subtask.isCompleted).length} of{" "}
            {task.subtasks?.length}{" "}
            {task.subtasks?.length === 1 ? "subtask" : "subtasks"}
          </p>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default TaskCards;
