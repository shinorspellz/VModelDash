import { ChildType } from "@/types/service";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import NextLink from "next/link";

const VMModal = ({ url, backTitle, children }: any) => {
  return (
    <Box
      sx={{
        position: "fixed",
        left: "0",
        top: 0,
        zIndex: "40",
        width: "100%",
        height: "100%",
      }}
    >
      <div className="flex h-full w-full">
        <div
          className="w-0 md:w-[280px]"
          style={{
            background: "rgba(0,0,0,.7)",
            cursor: "not-allowed",
          }}
        ></div>
        <div
          style={{
            width: "calc(100% - 280px)",
            background: "rgb(242 242 242)",
            height: "100%",
            overflowY: "auto",
            paddingBottom: "70px",
            paddingTop: "30px",
          }}
          className="w-fuller"
        >
          <Container maxWidth="xl">
            <Stack spacing={4}>
              <Stack spacing={4}>
                <div>
                  <Box sx={{ mb: 4 }}>
                    <NextLink href={url} passHref>
                      <Button
                        color="primary"
                        style={{
                          textTransform: "unset",
                        }}
                      >
                        <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                        <Typography variant="subtitle2">
                          Back to {backTitle}
                        </Typography>
                      </Button>
                    </NextLink>
                  </Box>
                </div>
              </Stack>
              {children}
            </Stack>
          </Container>
        </div>
      </div>
    </Box>
  );
};

export default VMModal;
