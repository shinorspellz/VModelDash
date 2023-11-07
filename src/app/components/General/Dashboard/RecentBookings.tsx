"use client";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import numeral from "numeral";
import { SeverityPill } from "../Widget/SeverityPill";
import VMTab from "../Widget/VMTab";

const RecentBookings = (props: any) => {
  const { transactions } = props;

  const statusMap: any = {
    confirmed: "success",
    on_hold: "warning",
    failed: "error",
  };

  return (
    <>
      <VMTab
        activeTab={(e) => console.log(e)}
        TabData={[
          {
            id: "all",
            label: "All",
          },
          {
            id: "confirmed",
            label: "Confirmed",
          },
          {
            id: "pending",
            label: "Pending",
          },
        ]}
        initialValue={"all"}
        isDivider={true}
      />
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
    </>
  );
};

export default RecentBookings;
