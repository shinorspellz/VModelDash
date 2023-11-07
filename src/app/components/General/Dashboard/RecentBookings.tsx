"use client";
import { useState } from "react";
import { format } from "date-fns";
import numeral from "numeral";
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import { SeverityPill } from "../Widget/SeverityPill";

const RecentBookings = (props: any) => {
  const { transactions } = props;
  const [value, setValue] = useState("all");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    // console.log(newValue);
    setValue(newValue);
  };

  const statusMap: any = {
    confirmed: "success",
    on_hold: "warning",
    failed: "error",
  };

  return (
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
        <Tab label="All" value="all" />
        <Tab label="Confirmed" value="confirmed" />
        <Tab label="Pending" value="pending" />
      </Tabs>
      <Divider />
      <Table sx={{ minWidth: 600 }}>
        <TableBody>
          {transactions.map((transaction: any) => {
            const createdAtMonth = format(
              transaction.createdAt,
              "LLL"
            ).toUpperCase();
            const createdAtDay = format(transaction.createdAt, "d");
            const statusColor = statusMap[transaction.status];
            const type =
              transaction.type === "receive"
                ? "Payment received"
                : "Payment sent";
            const amount =
              (transaction.type === "receive" ? "+" : "-") +
              " " +
              numeral(transaction.amount).format("$0,0.00");
            const amountColor =
              transaction.type === "receive" ? "success.main" : "error.main";

            return (
              <TableRow
                key={transaction.id}
                hover
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell width={100}>
                  <Box
                    sx={{
                      p: 1,
                      backgroundColor: (theme) =>
                        theme.palette.mode === "dark"
                          ? "rgb(243, 244, 246)"
                          : "rgb(243, 244, 246)",
                      borderRadius: 4,
                      maxWidth: "fit-content",
                    }}
                  >
                    <Typography
                      align="center"
                      color="text.primary"
                      variant="caption"
                    >
                      {createdAtMonth}
                    </Typography>
                    <Typography
                      align="center"
                      color="text.primary"
                      variant="h6"
                    >
                      {createdAtDay}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <div>
                    <Typography variant="subtitle2">
                      {transaction.sender}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      {type}
                    </Typography>
                  </div>
                </TableCell>
                <TableCell>
                  <SeverityPill color={statusColor}>
                    {transaction.status}
                  </SeverityPill>
                </TableCell>
                <TableCell width={180}>
                  <Typography color={amountColor} variant="subtitle2">
                    {amount}
                  </Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
};

export default RecentBookings;
