import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { getOne } from "@/lib/server-actions/simple-actions";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";
import ColumnLoading from "@/components/board/task-cards/loading";
import Board from "@/components/board";
import getColumnsAndTasks from "@/lib/server-actions/get-columns-and-tasks";
import authOptions from "@/app/api/auth/[...nextauth]/options";

interface I_Props {
  params: { id: string };
}

const BoardPage = async (props: I_Props) => {
  const session = await getServerSession(authOptions);
  // check if its user's board
  const boardFound = await getOne("boards", {
    _id: new ObjectId(props.params.id),
    author: session!.user._id,
  });

  if (!boardFound.data) {
    return redirect("/");
  }

  const res = await getColumnsAndTasks(props.params.id);

  if (!res.data) {
    return <section>No columns found.</section>;
  }

  return (
    <Suspense fallback={<ColumnLoading />}>
      <Board {...res.data} />
    </Suspense>
  );
};

export default BoardPage;
