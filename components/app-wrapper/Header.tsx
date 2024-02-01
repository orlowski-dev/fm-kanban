import { Button, IconButton } from "@/components/button";
import { makeClassList } from "@/lib/utils";
import { HiDotsVertical, HiPlus } from "react-icons/hi";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Dropdown from "../dropdown";
import ThemeToggler from "../theme-toggler";
import BoardList from "../board-list";
import "@/assets/styles/app-wrapper.css";
import LogoutButton from "./LogoutButton";

interface I_Props {
  isSidebarVisible: boolean;
}

const Header = ({ isSidebarVisible }: I_Props) => {
  const boardName = useSearchParams().get("name");

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
          {boardName ?? undefined}
        </p>
        <div className="md:hidden">
          <Dropdown
            controlElement={
              <span className="text-hlg translate-y-[2px]">
                <span>{boardName ?? undefined}</span>
              </span>
            }
            showIndicator
          >
            <>
              <div className="pr-4">
                <BoardList />
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
              disabled={!boardName ?? undefined}
            >
              <HiPlus />
            </IconButton>
          </div>
          <div className="hidden md:block">
            <Button startIcon={<HiPlus />} disabled={!boardName ?? undefined}>
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
