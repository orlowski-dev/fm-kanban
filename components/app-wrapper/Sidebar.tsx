import type { I_BoardModel } from "@/lib/models/Board";
import { Button } from "@/components/button";
import { makeClassList } from "@/lib/utils";
import { HiEyeOff } from "react-icons/hi";
import ThemeToggler from "@/components/theme-toggler";
import "@/assets/styles/app-wrapper.css";
import BoardList from "../board-list";

interface I_Props {
  isSidebarVisible: boolean;
  boardListData: I_BoardModel[] | null | undefined;
  onClickFunc: () => void;
}

const Sidebar = ({ isSidebarVisible, boardListData, onClickFunc }: I_Props) => {
  return (
    <section
      className={makeClassList([
        "sidebar",
        isSidebarVisible ? "visible" : undefined,
      ])}
    >
      <div className="pr-6">
        <BoardList data={boardListData} />
      </div>
      <div className="grid gap-3 p-4">
        <ThemeToggler />
        <Button startIcon={<HiEyeOff />} variant="ghost" onClick={onClickFunc}>
          Hide sidebar
        </Button>
      </div>
    </section>
  );
};

export default Sidebar;
