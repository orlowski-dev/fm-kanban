import { Button } from "@/components/button";
import { makeClassList } from "@/lib/utils";
import { HiEyeOff } from "react-icons/hi";
import ThemeToggler from "@/components/theme-toggler";
import "@/assets/styles/app-wrapper.css";
import BoardList from "../board-list";

interface I_Props {
  isSidebarVisible: boolean;
  onClickFunc: () => void;
}

const Sidebar = ({ isSidebarVisible, onClickFunc }: I_Props) => {
  return (
    <section
      className={makeClassList([
        "sidebar",
        isSidebarVisible ? "visible" : undefined,
      ])}
    >
      <div className="pr-6">
        <BoardList />
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
