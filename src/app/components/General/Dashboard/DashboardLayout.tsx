"use client";

import React, { useEffect, useState } from "react";
import ProfileNav from "../../User/ProfileNav";
import Moment from "react-moment";
import SidebarLayout from "../SidebarLayout";
import { usePathname, useRouter } from "next/navigation";
import { Drawer, IconButton } from "@mui/material";
import { Menu as MenuIcon } from "../../Icons/menu";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Logout } from "@/service/user";
import { logOut } from "@/redux/features/auth-slice";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const authData = useSelector((state: RootState) => state?.authReducer?.value);
  const pathname = usePathname();
  const [isLoader, setIsLoader] = useState(true);
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  const onOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  //console.log(authData);

  useEffect(() => {
    setIsLoader(true);

    (async () => {
      if (!authData?.user?.first_name && authData?.isAuth) {
        await Logout();
        dispatch(logOut());
        router.refresh();
      }
    })();
    if (authData?.isAuth) {
      setIsLoader(false);
    } else {
    }
  }, [authData]);

  const onClose = () => {
    setIsSidebarOpen(false);
  };
  return (
    <div className="vm-bg w-full h-screen overflow-hidden overflow-y-auto">
      <header
        className="vm-header sticky z-[0] top-0 shadow-md"
        style={{
          backgroundColor: "#fff",
          backdropFilter: "blur(6px)",
          left: "280px",
          width: "calc(100% - 280px)",
        }}
      >
        <div className="flex flex-row justify-between min-h-[64px] px-4 items-center">
          <div className="flex flex-row space-x-3 items-center ">
            <IconButton
              onClick={onOpenSidebar}
              sx={{
                display: {
                  xs: "inline-flex",
                  lg: "none",
                },
              }}
            >
              <MenuIcon fontSize="medium" />
            </IconButton>
            <h5
              className="hidden md:block text-[1.2rem] font-semibold"
              style={{
                color: "#928585",
              }}
            >
              <Moment interval={1000} format="MMMM Do YYYY, h:mm a" />
            </h5>
          </div>

          <div className="ml-4">
            <ProfileNav
              profileData={{
                isLoader,
                authData: authData?.user,
              }}
            />
          </div>
        </div>
      </header>
      <div
        className="vm-sidebar block"
        style={{
          flex: "0 0 auto",
        }}
      >
        <SidebarLayout pathname={pathname} />
      </div>
      <div className="vm-drawer">
        <Drawer
          anchor="left"
          onClose={onClose}
          open={isSidebarOpen}
          PaperProps={{
            sx: {
              backgroundColor: "neutral.900",
              color: "#FFFFFF",
              width: 280,
            },
          }}
          sx={{ zIndex: (theme: any) => theme.zIndex.appBar + 100 }}
          variant="temporary"
        >
          <SidebarLayout pathname={pathname} />
        </Drawer>
      </div>
      <div
        className="vm-dashbody ml-[280px] flex max-w-full"
        style={{
          flex: "1 1 auto",
          width: "calc(100% - 280px)",
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
