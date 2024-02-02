import { redirect } from "next/navigation";

interface I_Props {}

const AppPage = async (props: I_Props) => {
  const board = {
    id: "b1",
    name: "Platform Lunch",
    slug: "65b938faa4d416808b20e67a-platform-lunch",
  };

  if (board) {
    return redirect(`/board/${board.id}`);
  }

  return <section>No board found</section>;
};

export default AppPage;
