import { I_BoardColumnModel } from "@/lib/models/Board";
import { tempGetColumnsData } from "@/lib/server-actions/temp-get-tasks";
import { Suspense } from "react";
import ColumnLoading from "@/components/board/task-cards/loading";
import Board from "@/components/board";

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

  return (
    <Suspense fallback={<ColumnLoading />}>
      <Board columns={columns} />
    </Suspense>
  );
};

export default BoardPage;
