import { FunctionComponent, useState } from "react";
import { observer } from "mobx-react-lite";
import { Box } from "@mui/system";
import { useStore } from "../store";
import Login from "../components/Login";

interface Props {}

const Sidebar: FunctionComponent<Props> = observer(() => {
  const store = useStore();
  const { uiState } = store;
  if (!uiState.getLogged()) {
    return <Login />;
  }
  return <Box sx={{ flexGrow: 1 }}></Box>;
});

export default Sidebar;
