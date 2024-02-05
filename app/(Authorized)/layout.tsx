"use client";

import type { ReactNode } from "react";
import { useReducer, useEffect, Suspense } from "react";
import { getSession } from "next-auth/react";
import { getData } from "@/lib/server-actions/simple-actions";
import { I_BoardModel } from "@/lib/models/Board";
import { MainContext } from "@/lib/contexts/context";
import { IconButton } from "@/components/button";
import { HiEye } from "react-icons/hi";
import Sidebar from "@/components/app-wrapper/Sidebar";
import Header from "@/components/app-wrapper/Header";
import layoutReducer from "@/lib/reducers/layout-reducer";

const AuthorizedLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  const [states, dispatch] = useReducer(layoutReducer, {
    boards: null,
    currentBoardId: null,
    isSidebarVisible: true,
    columns: null,
    tasks: null,
  });

  // get boards
  useEffect(() => {
    const getBoards = async () => {
      const session = await getSession();
      const uid = session?.user._id;

      if (!uid || uid.length === 0) {
        // throw error
        console.log("no uid");
        return null;
      }

      try {
        const res = await getData("boards", { author: uid });

        if (res.status !== 200) {
          return null;
        }

        return res.data as I_BoardModel[] | null;
      } catch (error) {
        return null;
      }
    };

    getBoards().then((data) => dispatch({ type: "setBoards", payload: data }));
  }, []);

  return (
    <MainContext.Provider value={{ states, dispatch }}>
      <Suspense>
        <Header isSidebarVisible={states.isSidebarVisible} />
      </Suspense>
      <div className="main-wrapper">
        <Suspense>
          <Sidebar isSidebarVisible={states.isSidebarVisible} />
        </Suspense>
        <main className="main-wrapper__main">
          {children}
          <div className="hidden md:block fixed bottom-6 left-0 bg-main-purple rounded-tr-full rounded-br-full">
            <IconButton
              title="Open sidebar"
              onClick={() =>
                dispatch({ type: "setIsSidebarVisible", payload: true })
              }
            >
              <HiEye />
            </IconButton>
          </div>
        </main>
      </div>
      {/* {modal} */}
    </MainContext.Provider>
  );
};

export default AuthorizedLayout;
