"use client";

import { I_Task } from "@/lib/models/Task";
import type { Variants } from "framer-motion";
import { motion } from "framer-motion";

interface I_Props {
  tasks: I_Task[];
  onTaskClick: (taskID: string) => void;
}
const parentVariant: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const childrenVariant: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const TaskCards = ({ tasks, onTaskClick }: I_Props) => {
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
          onClick={() => onTaskClick(task._id)}
          className="block px-4 py-6 rounded-md bg-white dark:bg-dark-grey transition-colors shadow-lg cursor-pointer"
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
