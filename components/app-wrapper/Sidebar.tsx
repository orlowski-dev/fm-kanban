import { Suspense, type ReactNode } from "react";
import { Button } from "@/components/button";
import { makeClassList } from "@/lib/utils";
import { HiEyeOff } from "react-icons/hi";
import ThemeToggler from "@/components/theme-toggler";
import BoardsLoading from "@/app/(Authorized)/@boards/loading";
import "@/assets/styles/app-wrapper.css";

interface I_Props {
  isSidebarVisible: boolean;
  onClickFunc: () => void;
  boards: ReactNode;
}

const Sidebar = ({ isSidebarVisible, onClickFunc, boards }: I_Props) => {
  return (
    <section
      className={makeClassList([
        "sidebar",
        isSidebarVisible ? "visible" : undefined,
      ])}
    >
      <div className="pr-6">
        <Suspense fallback={<BoardsLoading />}>{boards}</Suspense>
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
