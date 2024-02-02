import type { I_BoardModel } from "@/lib/models/Board";
import { makeClassList } from "@/lib/utils";
import { HiPlus } from "react-icons/hi";
import { TbLayoutBoardSplit } from "react-icons/tb";
import { useParams } from "next/navigation";
import BoardsLoading from "./loading";
import Link from "next/link";

const BoardList = ({ data }: { data: I_BoardModel[] | undefined | null }) => {
  const params = useParams();
  const id = params.id as string;

  if (data === undefined) {
    return <BoardsLoading />;
  }

  return (
    <div>
      <h2 className="text-bodysm font-medium md:font-bold uppercase text-medium-grey px-4 md:px-6 lg:px-8 py-4 md:py-5">
        All boards {data ? `(${data.length})` : undefined}
      </h2>
      <ul style={{ maxWidth: "none" }}>
        {data
          ? data.map((item) => (
              <li key={item._id}>
                <Link
                  href={`/board/${item._id}`}
                  className={makeClassList([
                    "sidebar__boardlink",
                    id === item._id ? "active" : undefined,
                  ])}
                >
                  <TbLayoutBoardSplit className="text-[1.125rem]" />
                  {item.name}
                </Link>
              </li>
            ))
          : undefined}
        <li>
          <Link href="/" className="sidebar__boardlink new">
            <TbLayoutBoardSplit className="text-[1.125rem]" />
            <span className="flex items-center gap-2">
              <HiPlus />
              Create New Board
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default BoardList;
