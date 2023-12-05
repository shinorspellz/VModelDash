"use client";

import { Menu as MenuIcon } from "@/app/components/Icons/menu";
import { IconButton } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { VMLogo } from "../General/VMLogo";
import SidebarDrawer from "./VMDrawer/SidebarDrawer";

const Ulist = ({
  url,
  linkText,
  isActive,
  externalLinks,
}: {
  url: string;
  linkText: string;
  isActive: boolean;
  externalLinks: boolean;
}) => {
  return (
    <li className="flex vm-link">
      {externalLinks ? (
        <a
          href={url}
          rel="noreferrer"
          target="_blank"
          className={` ${isActive && "vm-link-active"}`}
        >
          {linkText}
        </a>
      ) : (
        <Link href={url} className={` ${isActive && "vm-link-active"}`}>
          {linkText}
        </Link>
      )}
    </li>
  );
};

const VMHeader = () => {
  const pathname = usePathname();
  const listLink = [
    {
      id: 0,
      url: "https://vmodelapp.com",
      linkText: "Home",
      externalLinks: false,
    },
    {
      id: 3,
      url: "https://vmodelapp.com/about",
      linkText: "About Us",
      externalLinks: false,
    },
    {
      id: 2,
      url: "https://vmodelapp.com/help-center",
      linkText: "Help Center",
      externalLinks: false,
    },
    {
      id: 4,
      url: "https://vmodelapp.com/faq",
      linkText: "FAQ",
      externalLinks: false,
    },
    {
      id: 1,
      url: "/",
      linkText: "For Employees",
      externalLinks: false,
    },
  ];

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const onOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  const onClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <header className="w-full vm-accord">
        <section className="px-0 md:px-[1%] py-0">
          <div className="max-w-[1600px] pl-3 md:pl-0 py-4 min-h-[10vh]  items-center justify-between flex mx-auto relative">
            <Link href="/">
              <div className="flex  items-center gap-3 md:gap-6">
                <VMLogo
                  isFull={true}
                  isDark={true}
                  width={200}
                  height={190}
                  className="vm-logo-mobile"
                />
              </div>
            </Link>
            {/* <div className="w-[84px] md:w-1/3">
              <div className="flex items-center content-center p-[10px] w-full flex-wrap ">
                <div className="text-left flex items-center justify-center w-[68px] max-w-full">
                  <div>
                    <Link href="/" className="hidden md:inline-block">
                      <VMLogo isDark={true} width={53} height={53} />
                    </Link>
                    <Link href="/" className="md:hidden">
                      <VMLogo isDark={true} width={40} height={40} />
                    </Link>
                  </div>
                </div>
              </div>
            </div> */}
            {/* <div className="flex-1 md:w-1/3">
              <div className="flex items-center content-center p-[10px] w-full flex-wrap ">
                <div className="text-center w-full ">
                  <Link href="">
                    <h2
                      className={`vm-h2 vm-logo vm-text-sec ${montserrat.className}`}
                    >
                      VModel
                    </h2>
                  </Link>
                </div>
              </div>
            </div> */}
            <div className="w-[84px] vm-w-tab md:w-auto min-h-[64px] flex">
              <div className="vm-hidden-md flex items-center content-center p-[10px] w-full flex-wrap ">
                <div className="flex flex-col w-full">
                  <nav className="flex">
                    <ul className="ml-auto justify-end flex flex-wrap m-0 p-0 leading-normal relative z-[2] space-x-[30px]">
                      {listLink.map((listItem) => (
                        <div key={listItem?.id}>
                          <Ulist
                            url={listItem?.url}
                            linkText={listItem?.linkText}
                            isActive={listItem?.id == 1}
                            externalLinks={listItem?.externalLinks}
                          />
                        </div>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="w-full flex items-center justify-center md:hidden">
                <IconButton
                  onClick={onOpenSidebar}
                  sx={{
                    display: {
                      xs: "inline-flex",
                      lg: "none",
                    },
                  }}
                >
                  <MenuIcon
                    fontSize="medium"
                    sx={{
                      width: 30,
                      height: 30,
                    }}
                    color="secondary"
                  />
                </IconButton>
              </div>
            </div>
          </div>
        </section>
      </header>
      <div className="vm-drawer">
        {isSidebarOpen && <SidebarDrawer setDrawerTogg={setIsSidebarOpen} />}
      </div>
    </>
  );
};

export default VMHeader;
