import { makeClassList } from "@/lib/utils";
import { useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { TbLayoutBoardSplit } from "react-icons/tb";
import { tempGetData } from "@/lib/server-actions/temp-get-board-list";
import { useParams } from "next/navigation";
import BoardsLoading from "./loading";
import Link from "next/link";

const BoardList = () => {
  // temp
  const [data, setData] = useState<
    | undefined
    | null
    | {
        id: string;
        name: string;
        slug: string;
      }[]
  >(undefined);
  // --

  const params = useParams();
  const slug = params.slug as string;

  useEffect(() => {
    const getData = async () => {
      return await tempGetData();
    };
    getData().then((data) => setData(data));
  }, []);

  if (data === undefined) {
    return <BoardsLoading />;
  }

  return (
    <div>
      <h2 className="text-bodysm font-medium md:font-bold uppercase text-medium-grey px-6 lg:px-8 py-5">
        All boards {data ? `(${data.length})` : undefined}
      </h2>
      <ul>
        {data
          ? data.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/board/${item.slug}?name=${item.name}`}
                  className={makeClassList([
                    "sidebar__boardlink",
                    slug === item.slug ? "active" : undefined,
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
