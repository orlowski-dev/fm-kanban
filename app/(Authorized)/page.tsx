import { redirect } from "next/navigation";

interface I_Props {
  searchParams: { board?: string };
}

const AppPage = async (props: I_Props) => {
  // if not search params, get first board
  if (!props.searchParams.board) {
    // get first board
    const board = {
      id: "123",
      name: "Platform Lunch",
      slug: "65b938faa4d416808b20e67a-platform-lunch",
    };

    return redirect("/?board=" + board.slug);
  }

  return <p>Board: {props.searchParams.board}</p>;
};

export default AppPage;
