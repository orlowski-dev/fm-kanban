"use client";

import { HiEye } from "react-icons/hi";
import { IconButton } from "@/components/button";
import { useState, type ReactNode } from "react";
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
  return (
    <>
      <Header isSidebarVisible={sidebarVisible} />
      <div className="main-wrapper">
        <Sidebar
          isSidebarVisible={sidebarVisible}
          onClickFunc={hideSidebarOnclick}
        />
        <main className="main-wrapper__main">
          {children}
          <div className="fixed bottom-6 left-0 bg-main-purple rounded-tr-full rounded-br-full">
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
