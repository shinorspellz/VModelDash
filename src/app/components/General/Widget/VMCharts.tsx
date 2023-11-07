"use client";

import { styled } from "@mui/material/styles";
import dynamic from "next/dynamic";

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

export const Chart = styled(ApexCharts)(({ theme }: any) => ({
  "& .apexcharts-xaxistooltip": {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[16],
    borderRadius: theme.shape.borderRadius,
    border: 0,
    "&::before, &::after": {
      display: "none",
    },
  },
  "& .apexcharts-tooltip": {
    "&.apexcharts-theme-light, &.apexcharts-theme-dark": {
      backdropFilter: "blur(6px)",
      background: "transparent",
      border: 0,
      boxShadow: "none",
      "& .apexcharts-tooltip-title": {
        background: "rgba(0,0,0,.7)",
        border: 0,
        color: theme.palette.common.white,
        margin: 0,
      },
      "& .apexcharts-tooltip-series-group": {
        background: "rgba(0,0,0,.7)",
        border: 0,
        color: theme.palette.common.white,
      },
    },
  },
}));
