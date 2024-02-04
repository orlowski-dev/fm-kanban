"use client";

import type { I_BoardModel } from "@/lib/models/Board";
import { HiEye } from "react-icons/hi";
import { IconButton } from "@/components/button";
import { useState, type ReactNode, Suspense, useEffect } from "react";
import { getData } from "@/lib/server-actions/simple-actions";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Header from "@/components/app-wrapper/Header";
import Sidebar from "@/components/app-wrapper/Sidebar";
import CreateBoardModal from "@/components/board/modals/CreateBoardModal";

interface I_Props {
  children: ReactNode;
}

const AuthorizedLayout = ({ children }: Readonly<I_Props>) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [redirectUrl, setRedirectUrl] = useState<string | undefined>(undefined);
  const [modal, setModal] = useState<ReactNode | null>(null);
  const [boardList, setBoardList] = useState<I_BoardModel[] | undefined | null>(
    undefined
  );

  useEffect(() => {
    const getBoards = async () => {
      const session = await getSession();
      const uid = session?.user._id as string;

      if (uid) {
        const res = await getData("boards", { author: uid });
        if (res.data) {
          return res.data as I_BoardModel[];
        } else {
          return null;
        }
      }
    };
    getBoards().then((data) => setBoardList(data));
  }, []);

  if (redirectUrl) {
    return redirect(redirectUrl);
  }

  const hideSidebarOnclick = () => {
    setSidebarVisible(false);
  };
  const showModal = (modal: string) => {
    setModal(() => {
      switch (modal) {
        case "create-board":
          return (
            <CreateBoardModal
              onClose={() => setModal(null)}
              callback={(boardID) => setRedirectUrl("/board/" + boardID)}
            />
          );
        default:
          console.log("Unknown modal name");
          return null;
      }
    });
  };

  return (
    <>
      <Suspense>
        <Header
          isSidebarVisible={sidebarVisible}
          boardListData={boardList}
          onNewBoardClickFunc={showModal}
        />
      </Suspense>
      <div className="main-wrapper">
        <Suspense>
          <Sidebar
            boardListData={boardList}
            isSidebarVisible={sidebarVisible}
            onClickFunc={hideSidebarOnclick}
            onNewBoardClickFunc={showModal}
          />
        </Suspense>
        <main className="main-wrapper__main">
          {children}
          <div className="hidden md:block fixed bottom-6 left-0 bg-main-purple rounded-tr-full rounded-br-full">
            <IconButton
              title="Open sidebar"
              onClick={() => setSidebarVisible(true)}
            >
              <HiEye />
            </IconButton>
          </div>
        </main>
      </div>
      {modal}
    </>
  );
};

export default AuthorizedLayout;
