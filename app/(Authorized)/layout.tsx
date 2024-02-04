"use client";

import type { I_BoardModel } from "@/lib/models/Board";
import { HiEye } from "react-icons/hi";
import { IconButton } from "@/components/button";
import { useState, type ReactNode, Suspense, useEffect } from "react";
import { getData } from "@/lib/server-actions/simple-actions";
import { getSession } from "next-auth/react";
import Header from "@/components/app-wrapper/Header";
import Sidebar from "@/components/app-wrapper/Sidebar";

interface I_Props {
  children: ReactNode;
}

const AuthorizedLayout = ({ children }: Readonly<I_Props>) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const hideSidebarOnclick = () => {
    setSidebarVisible(false);
  };
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

  return (
    <>
      <Suspense>
        <Header isSidebarVisible={sidebarVisible} boardListData={boardList} />
      </Suspense>
      <div className="main-wrapper">
        <Suspense>
          <Sidebar
            boardListData={boardList}
            isSidebarVisible={sidebarVisible}
            onClickFunc={hideSidebarOnclick}
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
    </>
  );
};

export default AuthorizedLayout;
