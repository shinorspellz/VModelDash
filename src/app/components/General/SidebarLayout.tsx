import Link from "next/link";
import React from "react";
import { Logo } from "./logo";
import ScrollBar from "./ScrollBar";

import { SidebarItemType } from "@/types/service";
import { Button } from "@nextui-org/react";
import VMIcons from "@/utils/icons";

import SidebarData from "@/utils/data/Sidebar.json";

const SidebarItem = (props: SidebarItemType) => {
  const { title, icon, isActive, url } = props;
  return (
    <>
      <Button
        className={`w-[88%] py-0 h-auto rounded-l-[0px] block rounded-r-[30px] relative leading-none`}
        style={{
          backgroundColor: isActive ? "rgba(255,255,255,.7)" : "#fff",
        }}
      >
        <Link href={url} className="py-4 block">
          {isActive && (
            <div className="absolute left-0 w-[10px] h-full bg-white top-0 rounded-r-[10px]"></div>
          )}
          <div className="flex flex-row space-x-4 items-center pl-5">
            {icon}
            <div className="text-primary font-semibold">{title}</div>
          </div>
        </Link>
      </Button>
    </>
  );
};

const SidebarLayout = ({ pathname }: { pathname: string }) => {
  return (
    <div
      className="fixed vm-bg-primary h-full z-[1200] flex-col flex overflow-hidden left-0 top-0"
      style={{
        transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        width: "280px",
        color: "#fff",
      }}
    >
      <div className="h-[120px] w-full flex  items-center justify-center">
        <Link href="/dashboard">
          <Logo isDark={true} />
        </Link>
      </div>
      <ScrollBar styles={{ maxHeight: "calc(100vh - 120px)" }}>
        <nav
          className="flex flex-col py-6"
          style={{
            flexGrow: 1,
          }}
        >
          <ul className="flex flex-col space-y-9">
            {SidebarData.length &&
              SidebarData.map((sItem) => (
                <div key={sItem.id}>
                  <SidebarItem
                    title={sItem.title}
                    icon={<VMIcons iconType={sItem.icon} />}
                    isActive={pathname == sItem.url ? true : false}
                    url={sItem.url}
                  />
                </div>
              ))}
          </ul>
        </nav>
      </ScrollBar>
    </div>
  );
};

export default SidebarLayout;
