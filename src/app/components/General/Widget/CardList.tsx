import React from "react";
import { List } from "@mui/material";
import { ChildType } from "@/types/service";

const CardList = (props: ChildType) => {
  const { children } = props;
  return <List disablePadding>{children}</List>;
};

export default CardList;
