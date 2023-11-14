import { ChildType } from "@/types/service";
import NextLink from "next/link";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { Logo } from "../General/logo";

const LoginA = () => {
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        display: "flex",
        flex: "1 1 auto",
        flexDirection: {
          xs: "column-reverse",
          md: "row",
        },
        height: "100vh",
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          backgroundColor: "#503c3b",
          // backgroundImage: 'url("/assets/images/bg/gradient-bg.svg")',
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
          color: "common.white",
          display: "flex",
          flex: {
            xs: "0 0 auto",
            md: "1 1 auto",
          },
          justifyContent: "center",
          p: {
            xs: 4,
            md: 8,
          },
        }}
      >
        <Box maxWidth="md">
          <Typography sx={{ mb: 1 }} variant="h4">
            VModel Administration
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "background.paper",
          display: "flex",
          flex: {
            xs: "1 1 auto",
            md: "0 0 auto",
          },
          flexDirection: "column",
          justifyContent: {
            md: "center",
          },
          maxWidth: "100%",
          p: {
            xs: 4,
            md: 8,
          },
          width: {
            md: "50%",
          },
        }}
      >
        <div>
          <Box sx={{ mb: 4 }}>
            <Stack
              alignItems="center"
              component={NextLink}
              direction="row"
              display="inline-flex"
              href={"/"}
              spacing={1}
              sx={{ textDecoration: "none" }}
            >
              <Logo isDark={true} />
            </Stack>
          </Box>
          {/* LOGIN FORM HERE */}
        </div>
      </Box>
    </Box>
  );
};

export default LoginA;
