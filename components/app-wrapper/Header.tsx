"use client";

import { Button, IconButton } from "@/components/button";
import { makeClassList } from "@/lib/utils";
import { HiPlus } from "react-icons/hi";
import { useContext } from "react";
import { MainContext, ModalContext } from "@/lib/contexts";
import Image from "next/image";
import Dropdown, { DropdownOptionsList } from "../dropdown";
import ThemeToggler from "../theme-toggler";
import BoardList from "../board-list";
import Modal from "../modal";
import TaskForm from "../forms/TaskForm";
import BoardActionsDropdown from "./dropdowns/BoardActionsDropdown";
import "@/assets/styles/app-wrapper.css";

interface I_Props {
  isSidebarVisible: boolean;
}

const Header = ({ isSidebarVisible }: I_Props) => {
  const context = useContext(MainContext);
  const modalContext = useContext(ModalContext);

  if (!context) return;

  const { states } = context;
  const columsExists = states.columns && states.columns.length > 0;
  const currentBoard = states.boards?.find(
    (board) => board._id === states.currentBoardId
  );

  const onAddNewTaskClick = () => {
    modalContext?.dispatch({
      type: "setModal",
      payload: (
        <Modal title="Add New Task">
          <TaskForm action="create" />
        </Modal>
      ),
    });
  };

  return (
    <header
      className={makeClassList([
        "header",
        isSidebarVisible ? "sidebar-visible" : undefined,
      ])}
    >
      <div className="header__logo_area">
        <Image
          src="/brand/logo-black.svg"
          alt="logo"
          width={152}
          height={25}
          className="dark:hidden"
          priority
        />
        <Image
          src="/brand/logo-white.svg"
          alt="logo"
          width={152}
          height={25}
          className="hidden dark:block"
          priority
        />
      </div>
      <div className="header__actions">
        <p className="text-hlg hidden md:block translate-y-[2px]">
          {currentBoard?.name ?? (
            <span className="block animate-pulse w-12 h-6 rounded-md bg-lines-light dark:bg-lines-dark transition-colors"></span>
          )}
        </p>
        <div className="md:hidden">
          <Dropdown
            controlElement={
              <span className="text-hlg translate-y-[2px]">
                <span>
                  {currentBoard?.name ?? (
                    <span className="block animate-pulse w-12 h-6 rounded-md bg-lines-light dark:bg-lines-dark transition-colors"></span>
                  )}
                </span>
              </span>
            }
            showIndicator
          >
            <>
              <div className="pr-4">
                <BoardList data={states.boards} />
              </div>
              <div className="p-4">
                <ThemeToggler />
              </div>
            </>
          </Dropdown>
        </div>
        <div className="flex items-center gap-1">
          <div className="md:hidden">
            <IconButton
              size="sm"
              title="Add new task"
              disabled={!columsExists ?? undefined}
              onClick={onAddNewTaskClick}
            >
              <HiPlus />
            </IconButton>
          </div>
          <div className="hidden md:block">
            <Button
              startIcon={<HiPlus />}
              disabled={!columsExists ?? undefined}
              onClick={onAddNewTaskClick}
            >
              Add new task
            </Button>
          </div>
          <BoardActionsDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
