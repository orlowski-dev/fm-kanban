"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { I_Column } from "@/lib/models/Column";
import { I_Task } from "@/lib/models/Task";
import { I_ColumnAndTasksMerged } from "@/lib/models/Board";
import TaskCards from "./task-cards";
import TaskDetailModal from "./modals/TaskDetailModal";

interface I_Props {
  columns: I_Column[] | null;
  tasks?: I_Task[];
}

const Board = ({ columns, tasks }: I_Props) => {
  const [modal, setModal] = useState<null | ReactNode>(null);

  if (!columns) {
    return <section>No columns found.</section>;
  }

  // merge columns and tasks
  const merged: I_ColumnAndTasksMerged[] = columns.map((column) => ({
    ...column,
    tasks:
      tasks?.filter((task) => task.column === column._id) ?? ([] as I_Task[]),
  }));

  const columnsLength = columns.length;

  const addModal = (modal: ReactNode) => {
    setModal(modal);
  };

  return (
    <section>
      <ul
        className="grid gap-6 mx-auto"
        style={{
          gridTemplateColumns: `repeat(${columnsLength}, 17.5rem)`,
          width: `calc(17.5rem * ${columnsLength} + 1.5rem * ${columnsLength})`,
        }}
      >
        {merged.map((column) => (
          <li key={column._id}>
            <p className="text-bodysm text-medium-grey tracking-wide uppercase mb-4">
              {column.name} ({column?.tasks?.length ?? 0})
            </p>
            {column?.tasks && column?.tasks.length > 0 ? (
              <TaskCards
                tasks={column.tasks}
                onTaskClick={(taskID) =>
                  addModal(
                    <TaskDetailModal
                      onClose={() => setModal(null)}
                      task={column.tasks.find((task) => task._id === taskID)}
                      columns={merged}
                      currentColumn={column._id}
                    />
                  )
                }
              />
            ) : undefined}
          </li>
        ))}
      </ul>
      {modal}
    </section>
  );
};

export default Board;
