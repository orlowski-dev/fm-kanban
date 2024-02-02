"use client";

import type { I_BoardColumnModel, I_ColumnTask } from "@/lib/models/Board";
import type { ReactNode } from "react";
import { useState } from "react";
import TaskCards from "./task-cards";
import TaskDetailModal from "./modals/TaskDetailModal";

interface I_Props {
  columns: I_BoardColumnModel[] | null;
}

const Board = ({ columns }: I_Props) => {
  const [modal, setModal] = useState<null | ReactNode>(null);

  if (!columns) {
    return <section>No columns found.</section>;
  }

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
        {columns.map((column) => (
          <li key={column._id}>
            <p className="text-bodysm text-medium-grey tracking-wide uppercase mb-4">
              {column.name} ({column.tasks.length})
            </p>
            <TaskCards
              tasks={column.tasks}
              onTaskClick={(taskID) =>
                addModal(
                  <TaskDetailModal
                    onClose={() => setModal(null)}
                    task={
                      column.tasks.find(
                        (task) => task._id === taskID
                      ) as I_ColumnTask
                    }
                    columns={columns}
                    currentColumn={column._id}
                  />
                )
              }
            />
          </li>
        ))}
      </ul>
      {modal}
    </section>
  );
};

export default Board;
