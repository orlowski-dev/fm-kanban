import { Button, IconButton } from "@/components/button";
import { makeClassList } from "@/lib/utils";
import { HiDotsVertical, HiPlus } from "react-icons/hi";
import Image from "next/image";
import "@/assets/styles/app-wrapper.css";
import { useSearchParams } from "next/navigation";

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
        <p className="text-hlg">{boardName ?? undefined}</p>
        <div className="flex items-center gap-1">
          <div className="md:hidden">
            <IconButton size="sm" title="Add new task">
              <HiPlus />
            </IconButton>
          </div>
          <div className="hidden md:block">
            <Button startIcon={<HiPlus />}>Add new task</Button>
          </div>
          <IconButton size="sm" variant="ghost" title="Options">
            <HiDotsVertical />
          </IconButton>
        </div>
      </div>
    </header>
  );
};

export default Header;
