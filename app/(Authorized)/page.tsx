import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getOne } from "@/lib/server-actions/simple-actions";
import { I_BoardModel } from "@/lib/models/Board";
import authOptions from "../api/auth/[...nextauth]/options";
import NoBoardsFoundPage from "@/components/app-wrapper/NoBoardsFoundPage";

const AppPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) return;
  const res = await getOne("boards", { author: session.user._id });
  const boards = res.data as I_BoardModel | null;

  if (boards) {
    return redirect(`/board/${boards._id}`);
  }

  return <NoBoardsFoundPage />;
};

export default AppPage;
