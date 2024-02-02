import { Button, IconButton } from "@/components/button";
import { makeClassList } from "@/lib/utils";
import { HiDotsVertical, HiPlus } from "react-icons/hi";
import { useParams } from "next/navigation";
import { I_BoardModel } from "@/lib/models/Board";
import Image from "next/image";
import Dropdown from "../dropdown";
import ThemeToggler from "../theme-toggler";
import LogoutButton from "./LogoutButton";
import BoardList from "../board-list";
import "@/assets/styles/app-wrapper.css";

interface I_Props {
  isSidebarVisible: boolean;
  boardListData: I_BoardModel[] | null | undefined;
}

const Header = ({ isSidebarVisible, boardListData }: I_Props) => {
  const params = useParams();
  const currentBoard = boardListData?.find((item) => item._id === params.id);

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
                <BoardList data={boardListData} />
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
              disabled={!currentBoard ?? undefined}
            >
              <HiPlus />
            </IconButton>
          </div>
          <div className="hidden md:block">
            <Button
              startIcon={<HiPlus />}
              disabled={!currentBoard ?? undefined}
            >
              Add new task
            </Button>
          </div>
          <Dropdown
            position="right"
            offset
            controlElement={
              <IconButton size="sm" variant="ghost" title="Options">
                <HiDotsVertical />
              </IconButton>
            }
          >
            <div className="p-4 grid text-bodysm text-medium-grey">
              <LogoutButton />
            </div>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default Header;
