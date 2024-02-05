"use client";

import { I_Column } from "@/lib/models/Column";
import { I_Task } from "@/lib/models/Task";
import { useContext, useEffect } from "react";
import { MainContext } from "@/lib/contexts/context";
import TaskCards from "./task-cards";
import EmptyBoardPage from "./EmptyBoardPage";
import { useParams } from "next/navigation";

interface I_Props {
  columns?: I_Column[] | null;
  tasks?: I_Task[];
}

const Board = ({ columns, tasks }: I_Props) => {
  const params = useParams();
  const context = useContext(MainContext);

  useEffect(() => {
    if (!context || context.states.currentBoardId === params.id) return;

    context.dispatch({ type: "setCurrentBoard", payload: params.id as string });
  }, [context, params.id]);

  useEffect(() => {
    if (
      !context ||
      context.states.tasks === tasks ||
      context.states.tasks === tasks
    )
      return;

    context.dispatch({
      type: "setColumnsAndTasks",
      payload: { columns, tasks },
    });
  }, [context, tasks, columns]);

  if (!context) return;

  const { states, dispatch } = context;

  if (!states.columns) {
    return <EmptyBoardPage />;
  }

  const columnsLength = states.columns.length;

  return (
    <section>
      <ul
        className="grid gap-6 mx-auto"
        style={{
          gridTemplateColumns: `repeat(${columnsLength}, 17.5rem)`,
          width: `calc(17.5rem * ${columnsLength} + 1.5rem * ${columnsLength})`,
        }}
      >
        {states.columns.map((column) => {
          const tasks = states.tasks?.filter(
            (task) => task.column === column._id
          );

          return (
            <li key={column._id}>
              <p className="text-bodysm text-medium-grey tracking-wide uppercase mb-4">
                {column.name} ({tasks?.length ?? 0})
              </p>
              {tasks && tasks.length > 0 ? (
                <ul>
                  <TaskCards tasks={tasks} />
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Board;
