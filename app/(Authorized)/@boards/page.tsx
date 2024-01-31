import authOptions from "@/app/api/auth/[...nextauth]/options";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { makeClassList } from "@/lib/utils";
import { TbLayoutBoardSplit } from "react-icons/tb";
import { HiPlus } from "react-icons/hi";

const getData = async () => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: [
          {
            id: "123",
            name: "Platform Lunch",
            slug: "65b938faa4d416808b20e67a-platform-lunch",
          },
          {
            id: "456",
            name: "Marketing Plan",
            slug: "65b938faa4d416808b20e67a-markering-plan",
          },
          {
            id: "567",
            name: "Roadmap",
            slug: "65b938faa4d416808b20e67a-roadmap",
          },
        ],
      });
    }, 10000);
  });
};

interface I_Props {
  searchParams: { board?: string };
}

const BoardsParallel = async (props: I_Props) => {
  const session = await getServerSession(authOptions);
  const userID = session?.user._id as string;

  const data = (await getData()) as {
    data: { id: string; name: string; slug: string }[];
  };
  return (
    <div>
      <h2 className="text-bodysm font-medium md:font-bold uppercase text-medium-grey px-6 lg:px-8 py-5">
        All boards ({data.data.length})
      </h2>
      <ul>
        {data.data.map((item) => (
          <li key={item.id}>
            <Link
              href={`/?board=${item.slug}`}
              className={makeClassList([
                "sidebar__boardlink",
                props.searchParams.board === item.slug ? "active" : undefined,
              ])}
            >
              <TbLayoutBoardSplit className="text-[1.125rem]" />
              {item.name}
            </Link>
          </li>
        ))}
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

export default BoardsParallel;
