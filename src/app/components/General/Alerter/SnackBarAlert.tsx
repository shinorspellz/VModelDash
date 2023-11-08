import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import React from "react";
import { isMobile } from "react-device-detect";

const Alert: any = React.forwardRef(function Alert(props, ref: any) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SlideTransition(props: any) {
  return <Slide {...props} direction={isMobile ? "down" : "down"} />;
}

const SnackBarAlert = (props: any) => {
  const [state, setState] = React.useState<any>({
    open: true,
    vertical: isMobile ? "top" : "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={props.AlertTimeout}
        TransitionComponent={SlideTransition}
        onClose={handleClose}
        sx={{
          ".MuiAlert-root": {
            borderRadius: "999px",
          },
        }}
        className={`${props.AlertFull ? "fullWidth" : ""}`}
        key={vertical + horizontal}
      >
        <Alert severity={`${props.Alerttype}`}>{props.AlertStmt}</Alert>
      </Snackbar>
    </div>
  );
};

export default SnackBarAlert;
