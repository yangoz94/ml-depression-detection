import React from "react";
import Spinner from "../components/Spinner";
import { Backdrop } from "@mui/material";

type props = {
    isLoading: boolean;
};

function Loading(props: props) {
  return (
    <Backdrop
      open={props.isLoading}
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Spinner />
    </Backdrop>
  );
}

export default Loading;
