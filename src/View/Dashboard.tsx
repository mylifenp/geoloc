import { FunctionComponent, useState } from "react";
import { observer } from "mobx-react-lite";
import MapViewer from "../components/MapViewer";
import { Box, Grid } from "@mui/material";
import Sidebar from "./Sidebar";
import { useStore } from "../store";

interface Props {}

const Dashboard: FunctionComponent<Props> = observer(() => {
  const store = useStore();
  const { uiState } = store;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Box sx={uiState.getLogged() ? {} : { opacity: 0.4 }}>
            <MapViewer />
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Sidebar />
        </Grid>
      </Grid>
    </Box>
  );
});

export default Dashboard;
