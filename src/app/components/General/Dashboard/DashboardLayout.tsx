"use client";

import React, { useEffect } from "react";
import ProfileNav from "../../User/ProfileNav";
import Moment from "react-moment";
import SidebarLayout from "../SidebarLayout";
import { usePathname } from "next/navigation";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="vm-bg w-full h-screen overflow-hidden overflow-y-auto">
      <header
        className="sticky z-[1100] top-0 shadow-md"
        style={{
          backgroundColor: "#fff",
          backdropFilter: "blur(6px)",
          left: "280px",
          width: "calc(100% - 280px)",
        }}
      >
        <div className="flex flex-row justify-between min-h-[64px] px-4 items-center">
          <h5
            className="text-[1.2rem] font-semibold"
            style={{
              color: "#928585",
            }}
          >
            <Moment interval={1000} format="MMMM Do YYYY, h:mm a" />
          </h5>
          <div className="ml-4">
            <ProfileNav />
          </div>
        </div>
      </header>
      <div
        className="block"
        style={{
          flex: "0 0 auto",
        }}
      >
        <SidebarLayout pathname={pathname} />
      </div>
      <div
        className="pl-[280px] flex max-w-full"
        style={{
          flex: "1 1 auto",
        }}
      >
        <div
          className="flex flex-col w-full"
          style={{
            flex: "1 1 auto",
          }}
        >
          <main
            className="py-[34px]"
            style={{
              flexGrow: 1,
            }}
          >
            <div className="px-6 w-full mx-auto block">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
