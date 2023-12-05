import { LinearProgress } from "@mui/material";
import { Spinner } from "@nextui-org/react";
import React from "react";

const PopLoader = ({ showLiner, popText }: any) => {
  return (
    <>
      {showLiner && (
        <div className="absolute top-0 left-0 w-full h-[10px]  z-[8889]">
          <LinearProgress color="success" />
        </div>
      )}

      <div
        className="flex absolute items-center justify-center left-0 top-0 z-[8888] h-full w-full"
        style={{
          background: "rgba(255,255,255,.9)",
        }}
      >
        <Spinner color="primary">
          <span className="font-medium">{popText}</span>
        </Spinner>
      </div>
    </>
  );
};

export default PopLoader;
