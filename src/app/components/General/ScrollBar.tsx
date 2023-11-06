"use client";

import React from "react";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

const ScrollBar = ({
  children,
  styles,
}: {
  children: React.ReactNode;
  styles: any;
}) => {
  return (
    <SimpleBar forceVisible="y" autoHide={true} style={styles}>
      {children}
    </SimpleBar>
  );
};

export default ScrollBar;
