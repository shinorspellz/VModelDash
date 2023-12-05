import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import * as React from "react";

import Link from "next/link";
import { VMLogo } from "../VMLogo";
import styles from "./SidebarDrawer.module.css";

type Anchor = "top" | "left" | "bottom" | "right";

interface drawProps {
  setDrawerTogg: any;
}

const SidebarDrawer = (props: drawProps) => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
    anchor: "right",
  });

  React.useEffect(() => {
    setState({ ...state, right: true });
  }, []);

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, right: open });
      setTimeout(() => {
        if (!open) {
          props.setDrawerTogg(open);
        }
      }, 200);
    };

  const ListItems = [
    {
      itemid: 6,
      itemTitle: "About Us",
      itemLink: "https://vmodelapp.com",
      itemType: 0,
      isExternal: false,
    },
    {
      itemid: 1,
      itemTitle: "About Us",
      itemLink: "https://vmodelapp.com/about",
      itemType: 0,
      isExternal: false,
    },

    {
      itemid: 3,
      itemTitle: "Help Center",
      itemLink: "https://vmodelapp.com/help-center",
      itemType: 0,
      isExternal: false,
    },
    {
      itemid: 4,
      itemTitle: "FAQ",
      itemLink: "https://vmodelapp.com/faq",
      itemType: 0,
      isExternal: false,
    },
    {
      itemid: 2,
      itemTitle: "For Employees",
      itemLink: "/",
      itemType: 0,
      isExternal: false,
    },
  ];

  return (
    <React.Fragment>
      <SwipeableDrawer
        className="vm-drawer-root z-[50]"
        anchor={"right"}
        open={state.right}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
      >
        <div className="flex flex-col w-screen h-full vm-bg-dark">
          <div
            className="px-5 relative w-full pb-5 flex items-center justify-between "
            style={{
              paddingTop: "calc(env(safe-area-inset-top) + 24px)",
            }}
          >
            <a>
              <div className="">
                <VMLogo isDark={true} width={50} height={50} />
              </div>
            </a>
            <div className="flex justify-end items-center">
              <IconButton onClick={toggleDrawer("right", false)}>
                <CloseIcon sx={{ fontSize: "30px", color: "#edceab" }} />
              </IconButton>
            </div>
          </div>
          <div
            className="overflow-auto p-0 "
            style={{
              flex: "1 1 0",
              paddingBottom: "env(safe-area-inset-bottom)",
            }}
          >
            <div className="block p-0 m-0">
              <div className="h-[5px]"></div>
              <ul className="p-0 m-0 flex flex-col flex-grow max-w-full">
                {ListItems.map((litem, index) => (
                  <Link
                    key={index}
                    href={litem.itemLink}
                    target={`${litem?.isExternal ? "_blank" : "_self"}`}
                    className={[
                      "relative min-h-[72px] flex flex-row items-center sbItem",
                      styles.sbarListItem,
                    ].join(" ")}
                  >
                    <div className="flex-col flex flex-grow  min-w-0 ">
                      <p
                        className="m-0 text-base md:text-[18px] font-normal md:font-bold leading-6"
                        style={{
                          color: "#edceab",
                        }}
                      >
                        {litem.itemTitle}
                      </p>
                    </div>
                    <svg
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0 w-6 h-6"
                      fill="rgba(255,255,255,.4)"
                    >
                      <path d="M14.481 12l-7.14 6.247a1 1 0 001.318 1.506l8-7a1 1 0 000-1.506l-8-7a1 1 0 10-1.317 1.506L14.482 12z"></path>
                    </svg>
                  </Link>
                ))}
              </ul>
              {/* <div className={styles.separator}></div>
              <ul className="p-0 m-0 flex flex-col flex-grow max-w-full">
                <a
                  className={[
                    "relative min-h-[72px] flex flex-row items-center sbItem",
                    styles.sbarListItem,
                  ].join(" ")}
                  href="/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="flex-col flex flex-grow  min-w-0 ">
                    <p
                      className="m-0 text-[18px] font-bold leading-6"
                      style={{
                        color: "rgba(255, 255, 255,.7)",
                      }}
                    >
                      Download the app
                    </p>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="flex-shrink-0 w-6 h-6"
                  >
                    <path
                      fill="rgba(255,255,255,.4)"
                      fillRule="evenodd"
                      d="M15.293 4.293a1 1 0 011.414 0l7 7A1.006 1.006 0 0124 12l-.004-.086.003.054L24 12a1.018 1.018 0 01-.146.52 1.035 1.035 0 01-.147.187l.08-.09a1.003 1.003 0 01-.007.008l-.073.082-7 7a1 1 0 01-1.414-1.414L20.585 13H3a1 1 0 01-.993-.883L2 12a1 1 0 011-1h17.585l-5.292-5.293a1 1 0 01-.083-1.32z"
                    />
                  </svg>
                </a>
              </ul> */}
            </div>
          </div>
        </div>
      </SwipeableDrawer>
    </React.Fragment>
  );
};

export default SidebarDrawer;
