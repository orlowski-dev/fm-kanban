"use client";

import { I_Column } from "@/lib/models/Column";
import { I_Task } from "@/lib/models/Task";
import { useContext, useEffect } from "react";
import { MainContext, ModalContext } from "@/lib/contexts";
import { HiPlus } from "react-icons/hi";
import { useParams } from "next/navigation";
import TaskCards from "./task-cards";
import EmptyBoardPage from "./EmptyBoardPage";
import CreateNewColumnForm from "../forms/CreateNewColumnForm";
import Modal from "../modal";
import ColumnDropdown from "./dropdowns/ColumnDropdown";

interface I_Props {
  columns?: I_Column[] | null;
  tasks?: I_Task[];
}

const Board = ({ columns, tasks }: I_Props) => {
  const params = useParams();
  const context = useContext(MainContext);
  const modalContext = useContext(ModalContext);

  // update columns and tasks on params change
  useEffect(() => {
    if (!context || context.states.currentBoardId === params.id) return;
    context.dispatch({ type: "setCurrentBoard", payload: params.id as string });
    context.dispatch({
      type: "setColumnsAndTasks",
      payload: { columns, tasks },
    });
  }, [context, params.id, columns, tasks]);

  // update columns and tasks on request
  useEffect(() => {
    if (!context?.states.refreshBoards) return;
    context.dispatch({
      type: "setColumnsAndTasks",
      payload: { columns, tasks },
    });
  }, [context, columns, tasks]);

  if (!context) return;

  const { states } = context;

  if (!states.columns) {
    return <EmptyBoardPage />;
  }

  const columnsLength = states.columns.length;

  return (
    <section>
      <ul
        className="grid gap-6 mx-auto"
        style={{
          gridTemplateColumns: `repeat(${columnsLength + 1}, 17.5rem)`,
          width: `calc(17.5rem * ${columnsLength + 1} + 1.5rem * ${
            columnsLength + 1
          })`,
        }}
      >
        {states.columns.map((column) => {
          const tasks = states.tasks?.filter(
            (task) => task.column === column._id
          );

          return (
            <li key={column._id}>
              <div className="flex items-center justify-between gap-1 mb-4">
                <p className="text-bodysm text-medium-grey tracking-wide uppercase">
                  {column.name} ({tasks?.length ?? 0})
                </p>
                <ColumnDropdown column={column} />
              </div>
              {tasks && tasks.length > 0 ? (
                <ul>
                  <TaskCards tasks={tasks} />
                </ul>
              ) : null}
            </li>
          );
        })}
        <div
          className="p-6 rounded-md mt-8 min-h-12 flex items-center justify-center bg-white dark:bg-dark-grey transition-colors"
          role="button"
          onClick={() =>
            modalContext?.dispatch({
              type: "setModal",
              payload: (
                <Modal title="Add Column">
                  <CreateNewColumnForm />
                </Modal>
              ),
            })
          }
        >
          <p className="text-bodysm text-medium-grey flex items-center gap-2">
            <HiPlus /> Add Column
          </p>
        </div>
      </ul>
    </section>
  );
};

export default Board;
