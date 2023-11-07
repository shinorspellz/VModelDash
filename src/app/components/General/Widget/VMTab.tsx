"use client";
import { useState } from "react";
import { Box, Divider, Tab, Tabs } from "@mui/material";
import { VMTabTypes } from "@/types/service";

const VMTab = ({ isDivider, TabData, activeTab, initialValue }: VMTabTypes) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    activeTab(newValue);
    setValue(newValue);
  };
  return (
    <>
      <Box
        sx={{
          ".MuiTabs-root": {
            // padding: 0,
            paddingRight: "20px !important",
            paddingLeft: "20px !important",
          },
          ".MuiButtonBase-root": {
            fontSize: 14,
            textTransform: "unset",
            minWidth: "auto !important",
            flexDirection: "column",
            padding: "12px 0",
            marginRight: "24px",
            position: "relative",
          },
          ".MuiTabs-indicator": {
            backgroundColor: "rgb(237, 206, 171)",
            // width: "16.775px !important",
          },
          ".MuiButtonBase-root.Mui-selected": {
            color: "rgb(84, 59, 59)",
          },
        }}
      >
        <Tabs value={value} onChange={handleChange} sx={{ px: 3 }}>
          {TabData.map((tabItem) => (
            <Tab label={tabItem?.label} key={tabItem.id} value={tabItem.id} />
          ))}
        </Tabs>
      </Box>
      {isDivider && <Divider />}
    </>
  );
};

export default VMTab;
