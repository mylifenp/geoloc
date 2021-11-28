import { FunctionComponent } from "react";
import { observer } from "mobx-react-lite";
import MapViewer from "../components/MapViewer";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import { useStore } from "../store";

interface Props {}

const Dashboard: FunctionComponent<Props> = observer(() => {
  const store = useStore();
  const { uiState } = store;
  return (
    <>
      <Box
        sx={
          !uiState.getLogged()
            ? {
                opacity: "0.4",
              }
            : {}
        }
      >
        <MapViewer />
      </Box>
      <Box
        sx={{
          bgcolor: "background.paper",
          color: "text.primary",
          p: 2,
          position: "absolute",
          top: 0,
          left: "70%",
          zIndex: "modal",
        }}
      >
        <Sidebar />
      </Box>
    </>
  );
});

export default Dashboard;
