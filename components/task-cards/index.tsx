"use client";

import type { I_ColumnTask } from "@/lib/models/Board";
import type { Variants } from "framer-motion";
import Link from "next/link";
import { motion } from "framer-motion";

interface I_Props {
  tasks: I_ColumnTask[];
}

const animation = {
  y: 0,
  opacity: 1,
  transition: {
    y: { stiffness: 1000, velocity: -100 },
  },
};

const parentVariant: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const childrenVariant: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const TaskCards = ({ tasks }: I_Props) => {
  return (
    <motion.ul
      className="grid gap-3"
      initial="initial"
      animate="animate"
      variants={parentVariant}
    >
      {tasks.map((task, index: number) => (
        <motion.li key={index} variants={childrenVariant}>
          <Link
            href="/"
            className="block px-4 py-6 rounded-md bg-white dark:bg-dark-grey transition-colors shadow-lg cursor-pointer"
          >
            <p className="text-hmd mb-2">{task.title}</p>
            <p className="text-bodysm text-medium-grey">
              {task.subtasks?.filter((subtask) => subtask.isCompleted).length}{" "}
              of {task.subtasks?.length}{" "}
              {task.subtasks?.length === 1 ? "subtask" : "subtasks"}
            </p>
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default TaskCards;
