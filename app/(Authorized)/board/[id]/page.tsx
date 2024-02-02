import { I_BoardColumnModel } from "@/lib/models/Board";
import { tempGetColumnsData } from "@/lib/server-actions/temp-get-tasks";
import { Suspense } from "react";
import TaskCards from "@/components/task-cards";
import ColumnLoading from "@/components/task-cards/loading";

interface I_Props {
  params: { id: string };
}

const BoardPage = async (props: I_Props) => {
  const columns: I_BoardColumnModel[] | null = await tempGetColumnsData(
    props.params.id
  );
  if (!columns) {
    return <section>No columns found.</section>;
  }

  const columnsLength = columns.length;

  return (
    <Suspense fallback={<ColumnLoading />}>
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
              <TaskCards tasks={column.tasks} />
            </li>
          ))}
        </ul>
      </section>
    </Suspense>
  );
};

export default BoardPage;
