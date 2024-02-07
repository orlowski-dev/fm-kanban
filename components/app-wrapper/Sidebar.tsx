"use client";

import { Button } from "@/components/button";
import { makeClassList } from "@/lib/utils";
import { HiEyeOff } from "react-icons/hi";
import { useContext } from "react";
import { MainContext } from "@/lib/contexts";
import ThemeToggler from "@/components/theme-toggler";
import BoardList from "../board-list";
import "@/assets/styles/app-wrapper.css";

interface I_Props {
  isSidebarVisible: boolean;
}

const Sidebar = ({ isSidebarVisible }: I_Props) => {
  const context = useContext(MainContext);

  if (!context) return;

  const { states, dispatch } = context;

  return (
    <section
      className={makeClassList([
        "sidebar",
        isSidebarVisible ? "visible" : undefined,
      ])}
    >
      <div className="pr-6">
        <BoardList data={states.boards} />
      </div>
      <div className="grid gap-3 p-4">
        <ThemeToggler />
        <Button
          startIcon={<HiEyeOff />}
          variant="ghost"
          onClick={() =>
            dispatch({ type: "setIsSidebarVisible", payload: false })
          }
        >
          Hide sidebar
        </Button>
      </div>
    </section>
  );
};

export default Sidebar;
